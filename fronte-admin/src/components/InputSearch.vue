<script>
export default {
    props: {
        modelValue: { type: String, default: "" },
    },
    emits: ["submit", "update:modelValue"],
    methods: {
        updateModelValue(e){
            const normalizedValue = e.target.value.toLowerCase();
            this.$emit("update:modelValue", normalizedValue);
        },
        submit(){
            this.$emit("submit");
        },
    },
};
</script>

<template>
    <div class="input-group">
        <input 
            type="text" class="form-control" 
            placeholder ="Nhập thông tin cần tìm"
            :value="modelValue"
            @input="updateModelValue" 
            @keyup.enter="submit"
        />
        <div class="input-group-append">
            <button id="find" class="btn btn-outline-secondary" type="button" @click="submit">Tìm kiếm</button>
        </div>
    </div>
</template>