import { Injectable } from '@nestjs/common';
import { FilmsRepository } from 'src/repository/films.repository';
import { FilmDto } from './dto/films.dto';

// обработка запросов, бизнес логика, взаимодействие с mongoose, но не напрямую
@Injectable()
export class FilmsService {
  constructor(private readonly repo: FilmsRepository) {}

  async getFilms() {
    const films = await this.repo.findAll();

    return {
      total: films.length,
      items: films,
    };
  }

  async createFilm(dto: FilmDto) {
    return this.repo.create(dto);
  }

  async getFilmSchedule(id: string) {
    const film = await this.repo.findScheduleByFilmId(id);

    return {
      total: film?.schedule?.length || 0,
      items: film?.schedule || [],
    };
  }
}