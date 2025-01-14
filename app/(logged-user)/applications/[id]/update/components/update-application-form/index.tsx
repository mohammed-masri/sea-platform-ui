"use client";
import {
  Button,
  FileInput,
  FileInputAcceptedTypes,
  FileInputFileState,
  FileInputUploadStatuses,
  Select,
  Textarea,
} from "sea-react-components";
import { Input } from "sea-react-components";
import { FormValidationUtils } from "@/utils";
import { FormikHelpers, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { pushNewAlert } from "@/store/slices/alert/slice";
import ApplicationActionInstance from "@/store/slices/application/actions";
import FileActionInstance from "@/store/slices/file/actions";
import { ApplicationStatuses, IApplication } from "@/dto/application";
import { IFile } from "@/dto/file";
import Image from "next/image";
import Link from "next/link";

type Values = {
  name: string;
  description: string;
  URL: string;
  iconFileId: string;
  status: ApplicationStatuses;
};
const initialValues: Values = {
  name: "",
  description: "",
  URL: "",
  iconFileId: "",
  status: ApplicationStatuses.Available,
};
export default function UpdateApplicationForm() {
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const [files, setFiles] = useState<FileInputFileState[]>([]);
  const [displayURL, setDisplayURL] = useState<string>("");

  const [application, setApplication] = useState<IApplication | undefined>(
    undefined
  );

  const onSubmit = (values: Values, formikHelpers: FormikHelpers<Values>) => {
    const { name, description, URL, iconFileId, status } = values;

    ApplicationActionInstance.updateApplicationDetails(
      params.id,
      name,
      description,
      iconFileId,
      URL,
      status
    )
      .then(() => {
        dispatch(
          pushNewAlert({
            message: "The application has been updated successfully",
            theme: "light",
            type: "success",
          })
        );
      })
      .catch((error) => {
        dispatch(
          pushNewAlert({
            message: error.message,
            theme: "light",
            type: "error",
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
      FormValidationUtils.Application.updateApplicationValidation,
    onSubmit,
  });

  useEffect(() => {
    ApplicationActionInstance.getApplicationDetails(params.id).then(
      (response) => {
        setApplication(response);

        const [file, iconFileId, url] = response.iconFile
          ? [
              {
                id: response.iconFile.id,
                serverId: response.iconFile.id,
                name: response.iconFile.name,
                progress: 100,
                size: response.iconFile.size,
                status: FileInputUploadStatuses.Uploaded,
                type: response.iconFile?.mimetype,
              },
              response.iconFile.id,
              response.iconFile.URL,
            ]
          : [undefined, "", ""];

        if (file) setFiles([file]);

        setDisplayURL(url);

        formik.setValues({
          iconFileId,
          name: response.name,
          URL: response.URL,
          description: response.description + "",
          status: response.status,
        });
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  console.log("formik\n", formik.values);
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

          <div className="col-span-4 md:col-span-2">
            <div className="flex flex-col gap-1">
              <label>Status</label>
              <Select<ApplicationStatuses>
                name="application-status"
                options={Object.values(ApplicationStatuses).map((value) => ({
                  label: value.replaceAll("-", " "),
                  value,
                }))}
                values={[formik.values.status]}
                setValues={(newValues) => {
                  console.log("new values");
                  formik.setFieldValue("status", newValues[0]);
                }}
                multiselect={false}
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
                    alt={`${application?.name} icon`}
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
            Update
          </Button>
        </div>
      </div>
    </form>
  );
}
