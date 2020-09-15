import { Field, ObjectType, ClassType, InputType } from 'type-graphql'

@InputType()
export class PaginationProp {
  @Field({ nullable: true, defaultValue: 1, description: '页码' })
  page: number
  @Field({ nullable: true, defaultValue: 20, description: '页大小' })
  limit: number
}

@ObjectType()
export class PaginationModel {
  @Field()
  limit: number
  @Field()
  total: number
  @Field()
  page: number
  @Field()
  pages: number
  @Field()
  hasMore: boolean
}
/**
 * @description 创建分页响应类工厂
 * @author lentoo
 * @date 2019-09-05
 * @export
 * @template TItem
 * @param {ClassType<TItem>} TItemClass
 * @returns
 */
export function PaginationResponseFactory<TItem>(TItemClass: ClassType<TItem>) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field()
    page: PaginationModel
    @Field(type => [TItemClass])
    items: TItem[]

    setData(_page: PaginationModel, _items: TItem[]) {
      this.page = _page
      this.items = _items
    }
  }
  return PaginatedResponseClass
}
