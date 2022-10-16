import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortcutController } from './shortcut.controller';
import { Shortcut } from './shortcut.entity';
import { ShortcutService } from './shortcut.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shortcut], 'memos')],
  controllers: [ShortcutController],
  providers: [ShortcutService],
})
export class ShortcutModule {}
