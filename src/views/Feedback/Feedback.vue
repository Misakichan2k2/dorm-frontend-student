<script setup>
import { ref, computed } from "vue";
import { STORE_FEEDBACK } from "@/services/stores";

const { onActionCreateFeedback } = STORE_FEEDBACK.StoreFeedback();

const feedbackTitle = ref("");
const feedbackContent = ref("");
const feedbackCategory = ref(null);
const feedbackFile = ref(null);
const feedbackDialog = ref(false);

const isSubmitDisabled = computed(() => {
  return (
    !feedbackTitle.value || !feedbackContent.value || !feedbackCategory.value
  );
});

const submitFeedback = async () => {
  console.log("submitFeedback được gọi"); // <- kiểm tra xem có log không
  try {
    const payload = {
      title: feedbackTitle.value,
      content: feedbackContent.value,
      type: feedbackCategory.value,
    };

    await onActionCreateFeedback(payload);
    feedbackDialog.value = true;
  } catch (err) {
    console.error("Gửi phản hồi thất bại", err?.response || err);
  }
};

const resetForm = () => {
  feedbackTitle.value = "";
  feedbackContent.value = "";
  feedbackCategory.value = null;
  feedbackFile.value = null;
  feedbackDialog.value = false;
};
</script>

<template>
  <v-container class="pa-0">
    <v-card class="pa-6 mx-auto" max-width="600">
      <div
        class="text-h5 text-center font-weight-bold text-blue-darken-3 mb-4 text-uppercase"
      >
        Gửi ý kiến phản hồi
      </div>

      <div class="mb-3">
        <img
          src="/public/images/feedback.jpeg"
          alt="feedbackImg"
          style="width: 100%"
          class="rounded-sm"
        />
      </div>

      <span>Tiêu đề phản hồi <span class="text-red-darken-3">*</span></span>
      <v-text-field
        v-model="feedbackTitle"
        placeholder="Tiêu đề phản hồi"
        variant="outlined"
        single-line
      ></v-text-field>

      <span>Nội dung phản hồi <span class="text-red-darken-3">*</span></span>
      <v-textarea
        v-model="feedbackContent"
        placeholder="Nội dung phản hồi"
        variant="outlined"
        single-line
      ></v-textarea>

      <span>Loại phản hồi <span class="text-red-darken-3">*</span></span>
      <v-select
        v-model="feedbackCategory"
        :items="['Góp ý', 'Khiếu nại', 'Khen ngợi', 'Khác']"
        placeholder="Loại phản hồi"
        variant="outlined"
      ></v-select>

      <div class="mt-3">
        <v-btn
          color="primary"
          :disabled="isSubmitDisabled"
          class="w-100"
          size="large"
          @click="submitFeedback"
        >
          Gửi phản hồi
        </v-btn>
      </div>
    </v-card>
  </v-container>

  <!-- Dialog Xác nhận gửi thành công -->
  <v-dialog v-model="feedbackDialog" max-width="450" persistent>
    <v-card class="pa-4" elevation="3">
      <v-card-title class="d-flex align-center">
        <v-icon color="success" class="me-2">mdi-check-circle</v-icon>
        <span class="text-h6 font-weight-medium">Gửi phản hồi thành công!</span>
      </v-card-title>

      <v-card-text class="text-body-1">
        Cảm ơn bạn đã gửi ý kiến phản hồi. Chúng tôi rất trân trọng sự đóng góp
        của bạn.
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn color="primary" variant="elevated" @click="resetForm">Ok</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
