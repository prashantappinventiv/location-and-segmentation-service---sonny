import { Controller } from '@nestjs/common';
import { SegmentService } from './segment.service.';

@Controller('marketing')
export class SegmentController {
  constructor(private readonly marketingService: SegmentService) {}
}
