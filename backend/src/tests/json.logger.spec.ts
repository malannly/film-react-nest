import { JsonLogger } from '../logger/json.logger';

describe('json logger test', () => {
  let log;

  const logger = new JsonLogger();

  // глушим консоль, чтобы не спамить терминал, создаем шпиона
  beforeEach(() => {
    log = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  // очистка мока после каждого теста
  afterEach(() => {
    log.mockRestore();
  });

  test('проверка правильного формата json', () => {
    logger.warn('message', { a: 1 });

    expect(log).toHaveBeenCalledTimes(1);

    // достаём строку, которую вывел логгер, вызовоа первой функции и первый ее аргумент
    const loggedString = log.mock.calls[0][0];

    // превращаем JSON-строку обратно в объект
    const parsed = JSON.parse(loggedString);

    // проверяем поля
    expect(parsed.level).toBe('warn');
    expect(parsed.message).toBe('message');
    expect(parsed.optionalParams).toEqual([{ a: 1 }]);
  });
});
