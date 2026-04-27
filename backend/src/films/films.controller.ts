import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { FilmsService } from './films.service';

// принимает hhtp запросы от клиента
@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  // все фильмы
  @Get()
  async getFilms() {
    const result = await this.filmsService.getFilms();
    return result;
  }

  // конкретный фильм
  @Get(':id/schedule')
  getFilmSchedule(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.filmsService.getFilmSchedule(id);
  }
}
