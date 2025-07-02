import { BaseService } from "@/core";
import { prisma } from "@/db";

type Exmple = typeof prisma.example;

export class ExampleService extends BaseService<Exmple> {
  constructor() {
    super(prisma, prisma.example);
  }
}
