<script setup>
import { ref, computed, onMounted } from "vue";
import { format } from "date-fns";
import { STORE_ROOM_INFO } from "@/services/stores";
import { useRouter } from "vue-router";

const { onActionGetMyRentedRoom } = STORE_ROOM_INFO.StoreRoomInfo();

const router = useRouter();
const rooms = ref([]);

const filter = ref({
  dateRange: [],
  building: "",
  roomNumber: "",
});

const formatDate = (date) => {
  if (!date || isNaN(new Date(date))) return "Không xác định";
  return format(new Date(date), "dd/MM/yyyy");
};

const searchTriggered = ref(false);

const resetFilters = () => {
  filter.value = {
    dateRange: [],
    building: "",
    roomNumber: "",
  };
  searchTriggered.value = false;
};

const filteredRooms = computed(() => {
  return rooms.value.filter((room) => {
    const matchesBuilding =
      !filter.value.building ||
      room?.room?.building?.name
        .toLowerCase()
        .includes(filter.value.building.toLowerCase());

    const matchesRoomNumber =
      !filter.value.roomNumber ||
      room?.room?.room.includes(filter.value.roomNumber);

    if (!filter.value.dateRange || filter.value.dateRange.length === 0) {
      return matchesBuilding && matchesRoomNumber;
    }

    const filterStart = new Date(filter.value.dateRange[0]);
    const filterEnd = new Date(
      filter.value.dateRange[filter.value.dateRange.length - 1]
    );
    filterEnd.setHours(23, 59, 59, 999);

    const roomStart = new Date(room?.startDate);
    const roomEnd = new Date(room?.endDate);

    const matchesDate =
      (roomStart >= filterStart && roomStart <= filterEnd) ||
      (roomEnd >= filterStart && roomEnd <= filterEnd) ||
      (roomStart <= filterStart && roomEnd >= filterEnd);

    return matchesBuilding && matchesRoomNumber && matchesDate;
  });
});

const renewalRequest = () => {
  router.push(`/room-info/renew-rental`);
};

onMounted(async () => {
  await onActionGetMyRentedRoom().then((res) => {
    console.log(res?.data);

    rooms.value = res?.data;
  });
});
</script>

<template>
  <v-container>
    <!-- Nếu chưa có phòng nào được thuê -->
    <template v-if="rooms.length === 0">
      <div class="text-center pa-16 d-flex flex-column ga-5">
        <i class="mdi mdi-book-clock text-h2 text-grey-lighten-1"></i>
        <p
          class="text-center text-muted font-italic text-subtitle-1 text-red-lighten-1"
        >
          Chưa có phòng được thuê!
        </p>
      </div>
    </template>

    <!-- Nếu có phòng, hiển thị bộ lọc -->
    <template v-else>
      <v-row>
        <v-col cols="12" md="4">
          <span class="text-body-1">Lọc theo số phòng:</span>
          <v-text-field
            v-model="filter.roomNumber"
            placeholder="Số phòng"
            variant="outlined"
            density="compact"
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <span class="text-body-1">Lọc theo khu nhà:</span>
          <v-text-field
            v-model="filter.building"
            placeholder="Khu nhà"
            variant="outlined"
            density="compact"
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <div class="d-flex flex-column justify-center">
            <p class="text-body-1">Lọc theo thời gian sử dụng:</p>
            <v-date-input
              v-model="filter.dateRange"
              placeholder="Thời gian sử dụng"
              multiple="range"
              density="compact"
              prepend-icon=""
              append-inner-icon="mdi-calendar"
              variant="outlined"
              :formatter="formatDate"
            ></v-date-input>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          class="d-flex justify-start"
          style="margin-top: -2.2rem"
        >
          <v-btn
            color="secondary"
            class="mb-5"
            elevation="0"
            variant="outlined"
            prepend-icon="mdi mdi-filter-off-outline"
            @click="resetFilters"
          >
            Làm mới
          </v-btn>
        </v-col>
      </v-row>

      <!-- Nếu không có phòng nào thỏa mãn điều kiện lọc -->
      <div class="text-center" v-if="filteredRooms.length === 0">
        <i class="mdi mdi-book-clock text-h2 text-grey-lighten-1"></i>
        <p class="text-center text-muted font-italic">
          Không có phòng nào phù hợp với kết quả tìm kiếm!
        </p>
      </div>

      <!-- Hiển thị danh sách phòng nếu có phòng thỏa điều kiện -->
      <v-row dense v-else>
        <v-col v-for="room in filteredRooms" :key="room.id" cols="12" md="6">
          <v-card class="mb-3">
            <v-card-title>
              <span class="font-weight-bold">
                Khu {{ room.room.building.name }} - Phòng {{ room.room.room }}
              </span>
            </v-card-title>
            <v-card-subtitle>
              <span class="text-muted">
                {{ formatDate(room.startDate) }} -
                {{ formatDate(room.endDate) }}
              </span>
            </v-card-subtitle>
            <v-card-text>
              <v-chip :color="room.status === 'Đang ở' ? 'green' : 'grey'">
                {{ room.status }}
              </v-chip>
              <v-btn
                v-if="room.status === 'Đang ở'"
                class="ml-3"
                color="primary"
                elevation="0"
                @click="renewalRequest(room)"
              >
                Gia hạn thuê
              </v-btn>
            </v-card-text>
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-title
                  >Thành viên cùng phòng</v-expansion-panel-title
                >
                <v-expansion-panel-text>
                  <span v-if="room.status === 'Đã trả'" class="text-grey"
                    >(Bạn đã trả phòng. Thông tin bạn cùng phòng gần nhất sẽ
                    được hiển thị.)</span
                  >
                  <v-list>
                    <v-list-item
                      v-for="member in room.roommates"
                      :key="member.studentId"
                    >
                      <v-list-item-title>
                        {{ member.name }} - {{ member.studentId }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ member.school }} - {{ member.class }} -
                        {{ member.course }}
                      </v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>
