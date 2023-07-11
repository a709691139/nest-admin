import { Test, TestingModule } from '@nestjs/testing';
import { DemoOneController } from './demoOne.controller';

describe('DemoOneController', () => {
  let controller: DemoOneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DemoOneController],
    }).compile();

    controller = module.get<DemoOneController>(DemoOneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
