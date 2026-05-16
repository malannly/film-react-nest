import { Injectable } from '@nestjs/common';
import { Film } from 'src/films/films.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from 'src/schedule/schedule.entity';

// работа с бд, делает запросы в mongoose
@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private readonly repo: Repository<Film>,
    @InjectRepository(Schedule)
    private readonly scheduleRepo: Repository<Schedule>,
  ) {}

  async findAll() {
    return this.repo.find({
      relations: ['schedule'],
    });
  }

  async create(data: any) {
    const film = this.repo.create(data);
    return this.repo.save(film);
  }

  async findScheduleByFilmId(filmId: string) {
    return this.repo.findOne({
      where: { id: filmId },
      relations: ['schedule'],
      order: {
        schedule: {
          daytime: 'ASC',
        },
      },
    });
  }

  async save(schedule: Schedule) {
    return this.scheduleRepo.save(schedule);
  }
}
