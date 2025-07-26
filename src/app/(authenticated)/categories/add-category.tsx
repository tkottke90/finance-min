"use client";
import { useActionState, useState, useEffect, useRef } from "react";
import { Plus } from "lucide-react";
import { Drawer, DrawerMethods } from "@/components/containers/drawer";
import { Category } from "@/lib/models/category";
import { createCategoryAction } from "@/app/dao/categories";
import { useRouter } from "next/navigation";

interface AddCategoryProps {
  existingCategories?: Category[];
}

export function delayAnimationFrame(delay: number, callback: () => void) {
  setTimeout(() => {
    requestAnimationFrame(() => {
      callback();
    });
  }, delay);
}

export function AddCategory({ existingCategories = [] }: AddCategoryProps) {
  const drawer = useRef<DrawerMethods>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const router = useRouter();
  const [formData, createCategory, isLoading] = useActionState(
    createCategoryAction,
    undefined,
  );

  const [selectedType, setSelectedType] = useState<string>("");

  // Filter out CATCH_ALL categories for overflow selection
  const overflowCategoryOptions = existingCategories.filter(
    (category) => category.type !== "CATCH_ALL",
  );

  // Reset selectedType when form is successfully submitted
  useEffect(() => {
    if (formData?.isSuccess) {
      // If the form submitted successfully, we can
      // allow the user to move on to other things by
      // showing their change in the background and then
      // automatically closing the drawer
      delayAnimationFrame(500, () => {
        router.refresh();

        delayAnimationFrame(2000, () => {
          drawer.current?.close();
          formRef.current?.reset();
          setSelectedType("");
        });
      });
    }
  }, [formData?.isSuccess]);

  // Update selectedType when formData changes (for validation errors)
  useEffect(() => {
    if (formData?.formState?.type && !selectedType) {
      setSelectedType(formData.formState.type);
    }
  }, [formData?.formState?.type, selectedType]);

  return (
    <Drawer
      ref={drawer}
      direction="right"
      title="Add Category"
      trigger={
        <button className="rounded-full w-fit hover:bg-zinc-200">
          <Plus width={28} height={28} />
        </button>
      }
    >
      <form action={createCategory} ref={formRef}>
        {formData?.message && (
          <div
            className={`mb-4 p-3 rounded ${
              formData.isSuccess
                ? "bg-green-100 border border-green-400 text-green-700"
                : "bg-red-100 border border-red-400 text-red-700"
            }`}
          >
            {formData.message}
          </div>
        )}

        <div className="form-field" suppressHydrationWarning={true}>
          <label htmlFor="name">Name</label>
          <input
            suppressHydrationWarning={true}
            type="text"
            id="name"
            name="name"
            className="form-input"
            placeholder="Category Name"
            defaultValue={formData?.formState?.name ?? ""}
            disabled={isLoading}
            required
            autoComplete="nope"
          />
        </div>

        <div className="form-field">
          <label htmlFor="description">Description</label>
          <textarea
            suppressHydrationWarning={true}
            id="description"
            name="description"
            className="form-input"
            placeholder="What kind of expenses will use this category?"
            defaultValue={formData?.formState?.description ?? ""}
            disabled={isLoading}
            autoComplete="nope"
          />
        </div>

        <CategoryType
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          formDataType={formData?.formState?.type}
          isLoading={isLoading}
        />

        <div className="form-field">
          <label htmlFor="color">Color (optional)</label>
          <input
            type="color"
            id="color"
            name="color"
            className="form-input"
            defaultValue={formData?.formState?.color ?? "#000000"}
            disabled={isLoading}
            autoComplete="nope"
          />
        </div>

        <div className="form-field">
          <label htmlFor="balance">Initial Balance</label>
          <input
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
            id="balance"
            name="balance"
            className="form-input"
            placeholder="$0.00"
            min="0"
            defaultValue={formData?.formState?.balance ?? 0}
            disabled={isLoading}
            required
            autoComplete="nope"
          />
        </div>

        <div className="form-field">
          <label htmlFor="overflowCategoryId">
            Overflow Category (optional)
          </label>
          <select
            id="overflowCategoryId"
            name="overflowCategoryId"
            className="form-input"
            defaultValue={formData?.formState?.overflowCategoryId ?? ""}
            disabled={isLoading}
          >
            <option value="">No overflow category</option>
            {overflowCategoryOptions.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-illuminating-emerald-500 text-white font-bold py-3 px-6 hover:bg-illuminating-emerald-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="animate-pulse">Creating...</span>
            ) : (
              "Create Category"
            )}
          </button>
        </div>
      </form>
    </Drawer>
  );
}

interface CategoryTypeProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
  formDataType?: string;
  isLoading: boolean;
}

function CategoryType({
  selectedType,
  onTypeChange,
  formDataType,
  isLoading,
}: CategoryTypeProps) {
  const getTypeDescription = (type: string) => {
    switch (type) {
      case "VARIABLE":
        return "Flexible categories for expenses that vary from cycle to cycle (e.g., groceries, entertainment). These can overflow to designated categories when overspent.";
      case "FIXED":
        return "Categories for consistent expenses like rent, utilities, and insurance. These don't overflow - negative balances are visible for manual adjustment.";
      case "GOAL":
        return "Long-term savings goals that accumulate funds over time. These don't overflow and help you work towards financial objectives.";
      default:
        return "Select a category type to see its description.";
    }
  };

  const currentType = selectedType || formDataType || "";

  return (
    <div className="form-field">
      <label htmlFor="type">Type</label>
      <select
        id="type"
        name="type"
        className="form-input"
        value={currentType}
        onChange={(e) => onTypeChange(e.target.value)}
        disabled={isLoading}
        required
      >
        <option value="">Select category type</option>
        <option value="VARIABLE">Variable</option>
        <option value="FIXED">Fixed</option>
        <option value="GOAL">Goal</option>
      </select>
      {currentType && (
        <p className="text-sm text-gray-600 mt-1">
          {getTypeDescription(currentType)}
        </p>
      )}
    </div>
  );
}
