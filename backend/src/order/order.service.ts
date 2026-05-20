import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderItemDto } from './dto/order.dto';
import { FilmsRepository } from 'src/repository/films.repository';
import { randomUUID } from 'crypto';
import { Schedule } from 'src/schedule/schedule.entity';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepo: FilmsRepository) {}

  async createOrder(dto: OrderItemDto[]) {
    if (!Array.isArray(dto) || dto.length === 0) {
      throw new BadRequestException({
        error: 'order is not a list or the order is an empty list',
      });
    }

    // session.id (key) -> session (value)
    const sessionSeat = new Map<string, Schedule>();

    for (const item of dto) {
      const film = await this.filmsRepo.findScheduleByFilmId(item.film);

      if (!film) {
        throw new BadRequestException({ error: 'film not found' });
      }

      const session = film.schedule.find(
        (s) => String(s.id) === String(item.session),
      );

      if (!session) {
        throw new BadRequestException({ error: 'session not found' });
      }

      // checks if the session has been bought
      const bookedSession = sessionSeat.get(session.id);

      // take existed session or new session
      const currentSession = bookedSession || session;

      const seatKey = `${item.row}:${item.seat}`;

      if (currentSession.taken.includes(seatKey)) {
        throw new BadRequestException({
          error: 'the seat is already taken',
        });
      }

      // adding the session
      currentSession.taken.push(seatKey);

      // saving the updated session with map
      sessionSeat.set(currentSession.id, currentSession);
    }

    // saving the session to postgre
    for (const session of sessionSeat.values()) {
      await this.filmsRepo.save(session);
    }

    return {
      total: dto.length,
      items: dto.map((item) => ({
        ...item,
        id: randomUUID(),
      })),
    };
  }
}
