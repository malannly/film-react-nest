import { FilmsController } from 'src/films/films.controller';
import { FilmDto, ScheduleDto } from '../films/dto/films.dto';
import { FilmsService } from 'src/films/films.service';
import { Test } from '@nestjs/testing';

const scheduleDto: ScheduleDto = {
  id: '2',
  daytime: '21.00',
  hall: 1,
  rows: 2,
  seats: 3,
  price: 1000,
  taken: ['3:4', '5;6'],
};

const filmDto: FilmDto = {
  id: '1',
  rating: 10,
  director: 'Jack',
  tags: ['cool', 'super'],
  title: 'Rich man',
  about: 'How to develop your business',
  description: 'What to become a millionaire? Must watch it then',
  image: 'image',
  cover: 'cover',
  schedule: [scheduleDto],
};

const filmsResponse = {
  total: 1,
  items: [filmDto],
};

const scheduleResponse = {
  total: 1,
  items: [scheduleDto],
};

describe('filmController', () => {
  let filmsController: FilmsController;
  let filmsService: FilmsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: {
            getFilms: jest.fn(),
            getFilmSchedule: jest.fn(),
          },
        },
      ],
    }).compile();
    filmsController = moduleRef.get(FilmsController);
    filmsService = moduleRef.get(FilmsService);
  });

  it('.getFilms() should call getFilms method of the service', async () => {
    (filmsService.getFilms as jest.Mock).mockResolvedValue(filmsResponse);

    const result = await filmsController.getFilms();

    expect(filmsService.getFilms).toHaveBeenCalledTimes(1);
    expect(result).toEqual(filmsResponse);
  });

  it('.getFilmSchedule() should call getFilmSchedule method of the service', async () => {
    (filmsService.getFilmSchedule as jest.Mock).mockResolvedValue(
      scheduleResponse,
    );

    const result = await filmsController.getFilmSchedule(filmDto.id);

    expect(filmsService.getFilmSchedule).toHaveBeenCalledWith(filmDto.id);
    expect(filmsService.getFilmSchedule).toHaveBeenCalledTimes(1);
    expect(result).toEqual(scheduleResponse);
  });
});
