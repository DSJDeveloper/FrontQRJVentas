<script setup>
defineProps({ message: String });
</script>

<template>
    <div class="error">
        {{ message }}
    </div>
</template>

<style scoped>
.error {
    background-color: #FFc;
    color: red;
    padding: 16px 32px;
    border: 1px solid red;
    border-radius: 5px;
    display: inline-block;
}
</style>
