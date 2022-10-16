import { Test, TestingModule } from '@nestjs/testing';
import { ShortcutController } from './shortcut.controller';

describe('ShortcutController', () => {
  let controller: ShortcutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortcutController],
    }).compile();

    controller = module.get<ShortcutController>(ShortcutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
