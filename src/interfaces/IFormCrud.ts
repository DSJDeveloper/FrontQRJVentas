import type { Ref } from "vue";

export default interface IFormCrud {
    //onSave?(): void;
    // onAdd(): void;
    // onEdit(row: Ref<any>): void;
    //onUpdate(): void;
    //onCreate(): void;
    cardFormRef?: any,
    isNewRow: boolean
    idRow?: string,
    model?: any,
    // onSave?(): void;
    // onDelete?(): void;

    //onNewRow?(value: boolean): void;

}