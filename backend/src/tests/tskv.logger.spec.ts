import { TskvLogger } from '../logger/tskv.logger';

describe('tskv logger test', () => {
  let log;

  const logger = new TskvLogger();

  // глушим консоль, чтобы не спамить терминал, создаем шпиона
  beforeEach(() => {
    log = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  // очистка мока после каждого теста
  afterEach(() => {
    log.mockRestore();
  });

  test('проверка правильного формата tskv', () => {
    // level=warn message=hello	time=2026-08-05T12:00:00.000Z param=world
    logger.warn('hello', 'world', 'tskv');

    expect(log).toHaveBeenCalledTimes(1);

    // достаём строку, которую вывел логгер, вызовоа первой функции и первый ее аргумент
    const loggedString = log.mock.calls[0][0];

    // шаблон времени
    const timeRegex = /time=\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/;

    // проверяем поля
    expect(loggedString).toContain('level=warn');
    expect(loggedString).toContain('message=hello');
    expect(loggedString).toMatch(timeRegex);
    expect(loggedString).toContain('param0=world');
    expect(loggedString).toContain('param1=tskv');
  });
});
