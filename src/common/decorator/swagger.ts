import { Pagination, ResponseWrap } from '@/common/dto/ResponseWrap';
import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseWrap) },
          {
            properties: {
              data: {
                allOf: [
                  { $ref: getSchemaPath(Pagination) },
                  {
                    properties: {
                      data: {
                        type: 'array',
                        items: { $ref: getSchemaPath(model) },
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    }),
  );
};

export const ApiResponseWrap = <TModel extends Type<any>>(model?: TModel) => {
  if (!model) {
    return applyDecorators(
      ApiOkResponse({
        schema: {
          $ref: getSchemaPath(ResponseWrap),
        },
      }),
    );
  }
  return applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseWrap) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(model),
              },
            },
          },
        ],
      },
      // schema: {
      //   type: 'object',
      //   properties: {
      //     message: { type: 'number' },
      //     status: { type: 'number' },
      //     data: {
      //       $ref: getSchemaPath(model),
      //     },
      //   },
      // },
    }),
  );
};
