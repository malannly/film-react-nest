import { OrderService } from '../order/order.service';
import { OrderController } from '../order/order.controller';
import { CreateOrderDto, OrderItemDto } from '../order/dto/order.dto';
import { Test } from '@nestjs/testing';

const orderItemDto: OrderItemDto = {
  film: 'Back to the future',
  session: 'night',
  daytime: '21.00',
  row: 1,
  seat: 2,
  price: 3,
};

const createOrderDto: CreateOrderDto = {
  email: 'razrabotchuk@gmail.com',
  phone: '+71234567890',
  tickets: [orderItemDto],
};

describe('orderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            createOrder: jest.fn(),
          },
        },
      ],
    }).compile();
    orderController = moduleRef.get(OrderController);
    orderService = moduleRef.get(OrderService);
  });

  it('.createOrder() should call createOrder method of the service', () => {
    const item = createOrderDto;

    orderController.createOrder(item);

    expect(orderService.createOrder).toHaveBeenCalledWith(item);
  });
});
