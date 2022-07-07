import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadCarImageService } from '../services/UploadCarImage.service';

interface IFile {
  filename: string;
}

export class UploadCarImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFile[];

    const image_names = images.map((img) => img.filename);

    const uploadCarImageService = container.resolve(UploadCarImageService);

    const carImages = await uploadCarImageService.execute({
      car_id: id,
      image_names,
    });

    return response.status(201).json(carImages);
  }
}
