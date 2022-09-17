import { PrismaClient, order, product } from "@prisma/client";
import { OrderFetchAllPayloadDTO } from "./order-interfaces";

export default class orderRepository {
  constructor(private readonly client: PrismaClient) { }


  public async all(params: OrderFetchAllPayloadDTO): Promise<Array<order>> {
    const data = await this.client.order.findMany();

    return data;
  }

  public async get(
    id: number,
    params: OrderFetchAllPayloadDTO
  ): Promise<order | null> {
    const order = await this.client.order.findFirst({
      where: { id }
    });
    return order;
  }



  public async save(data: any): Promise<order> {
    const order = await this.client.order.create({
      data,
    });

    try {
      if (order.products) {
        let PRD: any = JSON.parse(order.products?.toString())
        for (const k in PRD) {
          let prd: product | null = await this.client.product.findFirst({ where: { id: PRD[k].id } })
          if (prd) {
            let estoque = Number(prd.estoque - PRD[k].quantidade)
            let data = {
              ...prd,
              estoque: estoque
            }
            await this.client.product.update({ where: { id: PRD[k].id }, data })

          }

        }
      }

    } catch (err) {
      console.log(err)
    }

    return order;
  }

  public async update(id: number, data: Object): Promise<order> {
    const order = await this.client.order.update({
      where: { id },

      data,
    });

    return order;
  }

  public async delete(id: number): Promise<order> {
    const order = await this.client.order.delete({
      where: { id },
    });

    return order;
  }
}
