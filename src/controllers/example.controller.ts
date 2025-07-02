import { catchAsync } from "@/utils/catch-async";
import { ExampleService } from "@services/example.service";

class ExampleController {
  exmaple = catchAsync(async (req, res, next) => {
    const exampleService = new ExampleService();

    const data = await exampleService.paginate({
      page: 1,
      limit: 3,
    });

    res.status(200).json({
      status: "موفق",
      message: "داده های مورد نظر یافت شدند",
      ...data,
    });
  });

  postExample = catchAsync(async (req, res, next) => {
    const { name } = req.body;

    const exampleService = new ExampleService();

    const data = await exampleService.create({
      data: {
        name,
      },
    });

    res.status(201).json({
      status: "موفق",
      message: "داده ایجاد شد",
      data,
    });
  });
}

export const exampleController = new ExampleController();
