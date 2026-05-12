import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { FilmDto } from 'src/films/dto/films.dto';
import { FilmDocument } from 'src/films/films.schems';

// работа с бд, делает запросы в mongoose
@Injectable()
export class FilmsRepository {
  constructor(@InjectModel('Film') private filmModel: Model<FilmDocument>) {}

  async findAll() {
    const films = await this.filmModel.find();
    return films;
  }

  async create(data: Partial<FilmDto>) {
    return this.filmModel.create(data);
  }

  async findScheduleByFilmId(filmId: string) {
    return this.filmModel.findOne({ id: filmId });
  }
}
