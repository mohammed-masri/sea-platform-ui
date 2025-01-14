import { APIsConfig } from "@/config";
import { IFile } from "@/dto/file";

import axiosInstance from "@/utils/axios";

class FileAction {
  private static instance: FileAction;

  // Private constructor to prevent direct instantiation
  private constructor() {}

  // Public static method to get the instance
  public static getInstance(): FileAction {
    if (!FileAction.instance) {
      FileAction.instance = new FileAction();
    }
    return FileAction.instance;
  }

  uploadFile(file: File) {
    const data = new FormData();
    data.append("file", file);

    return axiosInstance
      .post(APIsConfig.APIs.File.upload, data)
      .then((response) => response as unknown as IFile);
  }

  deleteFile(id: string) {
    return axiosInstance
      .delete(APIsConfig.APIs.File.delete(id))
      .then((response) => response as unknown as IFile);
  }
}

const FileActionInstance = FileAction.getInstance();

export default FileActionInstance;
