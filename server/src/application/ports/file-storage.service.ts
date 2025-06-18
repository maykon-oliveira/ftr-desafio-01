import {
	UploadFileToStorageInput,
	UploadFileToStorageOutput,
} from "../validators/storage.validator";

export interface FileStorageService {
	uploadFile(input: UploadFileToStorageInput): Promise<UploadFileToStorageOutput>;
}
