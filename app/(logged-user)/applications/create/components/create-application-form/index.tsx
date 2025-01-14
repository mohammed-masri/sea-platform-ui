"use client";
import {
  Button,
  FileInputAcceptedTypes,
  FileInput,
  Input,
  Textarea,
  FileInputFileState,
} from "sea-react-components";
import { FormValidationUtils } from "@/utils";
import { FormikHelpers, useFormik } from "formik";
import React, { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { pushNewAlert } from "@/store/slices/alert/slice";
import { useRouter } from "next/navigation";
import ApplicationActionInstance from "@/store/slices/application/actions";
import { ApplicationSliceActions } from "@/store/slices/application/slice";
import FileActionInstance from "@/store/slices/file/actions";
import { IFile } from "@/dto/file";
import Link from "next/link";
import Image from "next/image";

type Values = {
  name: string;
  description: string;
  URL: string;
  iconFileId: string;
};
const initialValues: Values = {
  name: "",
  description: "",
  URL: "",
  iconFileId: "",
};

export default function CreateApplicationForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [files, setFiles] = useState<FileInputFileState[]>([]);
  const [displayURL, setDisplayURL] = useState<string>("");

  const onSubmit = (values: Values, formikHelpers: FormikHelpers<Values>) => {
    const { name, description, URL, iconFileId } = values;
    ApplicationActionInstance.createNewApplication(
      name,
      description,
      iconFileId,
      URL
    )
      .then((response) => {
        dispatch(ApplicationSliceActions.pushNewApplication(response));
        router.push("/applications");
        dispatch(
          pushNewAlert({
            message: "New application has been created successfully",
            type: "success",
            theme: "light",
          })
        );
      })
      .catch((error) => {
        dispatch(
          pushNewAlert({
            message: error.message,
            type: "error",
            theme: "light",
          })
        );
      })
      .finally(() => {
        formikHelpers.setSubmitting(false);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema:
      FormValidationUtils.Application.createNewApplicationValidation,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-4 gap-5 items-start">
          <div className="col-span-4 md:col-span-2">
            <div className="flex flex-col gap-1">
              <label>Name</label>
              <Input
                id="name"
                name="name"
                placeholder="Application name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                errorMessage={formik.errors.name}
              />
            </div>
          </div>

          <div className="col-span-4 md:col-span-2">
            <div className="flex flex-col gap-1">
              <label>URL</label>
              <Input
                id="URL"
                name="URL"
                placeholder="Application URL"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.URL}
                errorMessage={formik.errors.URL}
              />
            </div>
          </div>

          <div className="col-span-4 md:col-span-3">
            <div className="flex flex-col gap-1">
              <label>Description</label>

              <Textarea
                id="description"
                name="description"
                rows={3}
                placeholder="type some details here..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                errorMessage={formik.errors.description}
              />
            </div>
          </div>

          <div className="col-span-3">
            <div className="flex flex-col gap-1">
              <label>Icon</label>

              <div className="flex">
                <FileInput<IFile>
                  name="icon"
                  files={files}
                  setFiles={setFiles}
                  multiple={false}
                  errorMessage={formik.errors.iconFileId}
                  onUpload={(file) =>
                    FileActionInstance.uploadFile(file.file as File)
                  }
                  onDelete={(file) =>
                    FileActionInstance.deleteFile(file.serverId + "")
                  }
                  acceptedTypes={[FileInputAcceptedTypes.Image]}
                  onUploadSuccess={(file) => {
                    formik.setFieldValue("iconFileId", file.id);
                    setDisplayURL(file.URL);
                  }}
                  onDeleteSuccess={() => {
                    formik.setFieldValue("iconFileId", "");
                    setDisplayURL("");
                  }}
                />
              </div>
            </div>
          </div>

          <div className="col-span-1 h-full">
            <div className="flex items-center justify-center h-full">
              {displayURL && (
                <Link href={displayURL} target="_blank">
                  <Image
                    src={displayURL}
                    alt="application icon"
                    width={50}
                    height={50}
                  />
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            loading={formik.isSubmitting}
            disabled={formik.isSubmitting || !formik.isValid}
            className="uppercase px-4 py-2 bg-primary-light"
          >
            Create
          </Button>
        </div>
      </div>
    </form>
  );
}
