import { Controller , FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file_upload.service';

@Controller('files')
export class FileUploadController {
    constructor(private readonly fileUploadServices: FileUploadService){}

    @Post('uploadImage/:id')
        @UseInterceptors(FileInterceptor('file'))
    uploadImage(
        @Param('id') productId: string,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({
                        maxSize: 200000,
                        message: 'Exceeds the maximum allowed'
                    }),
                    new FileTypeValidator({
                        fileType:/(jpg|jpeg|png|webp|svg|gif)/
                    })
                ]
            })
        ) file: Express.Multer.File,
    ){
        return this.fileUploadServices.uploadImage(file,productId)
    }
}
