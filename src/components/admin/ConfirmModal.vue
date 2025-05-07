<template>
    <div v-if="isVisible" class="modal-overlay1">
      <div class="modal1">
        <div class="modal-header1">
          <h5 class="modal-title text-white">Confirmation</h5>
          <button @click="close" class="close-button1 custom-close-button">&times;</button>
        </div>
        <div class="modal-body1">
          <p>{{ message }}</p>
        </div>
        <div class="modal-footer1">
          <button @click="confirm" class="btn btn-success">Confirmer</button>
          <button @click="close" class="btn btn-secondary">Annuler</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isVisible = ref(false);
  const message = ref('');
  const onConfirm = ref(null);



  const show = (msg, onConfirmCallback) => {
  message.value = msg; // ✅ Correct : on assigne la valeur du paramètre `msg`
  onConfirm.value = onConfirmCallback;
  isVisible.value = true;
};
  
  
  const confirm = () => {
    if (onConfirm.value) {
      onConfirm.value();
    }
    close();
  };
  
  const close = () => {
    isVisible.value = false;
  };
  
  defineExpose({ show });
  </script>
  
  <style scoped>
  .custom-close-button {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 50%;
  transition: background 0.3s ease, color 0.3s ease;
}

.custom-close-button:hover {
  background-color: rgba(255, 0, 0, 0.1);
  color: red;
}
  .modal-overlay1 {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal1 {
    background-color: #191c24;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    min-height: 150px; /* Assure une hauteur minimale */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .modal-header1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .modal-body1 {
    margin: 15px 0;
    color:white;
  }
  
  .modal-footer1 {
    text-align: right;
  }
  
  .close-button1 {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: white;
  }
  
  .btn {
    padding: 10px 20px;
    margin: 5px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .btn-danger {
    background-color: red;
    color: white;
  }
  
  .btn-secondary {
    background-color: #6c757d;
    color: white;
  }
  </style>
  