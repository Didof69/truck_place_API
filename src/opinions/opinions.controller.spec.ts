import { Test, TestingModule } from '@nestjs/testing';
import { OpinionsController } from './opinions.controller';
import { OpinionsService } from './opinions.service';

describe('OpinionsController', () => {
  let controller: OpinionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpinionsController],
      providers: [OpinionsService],
    }).compile();

    controller = module.get<OpinionsController>(OpinionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
