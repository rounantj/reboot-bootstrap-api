import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();
import { roles } from "../helpers/roles";
import { permissions } from "../helpers/permissions";
import { modules } from "../helpers/modules";
import * as fs from "fs";
import bcrypt from "bcrypt";
import produtos from '../helpers/produtos.json'


let config = fs.readFileSync("reboot.config.json");
const env = JSON.parse(config.toString());

const load = async () => {
  try {
    await client.user.deleteMany();
    await client.role_permission.deleteMany();
    await client.role.deleteMany();
    await client.permission.deleteMany();
    // * ----- Roles ------

    const allRoles = Object.values(roles).map((role) => {
      return {
        name: role,
      };
    });
    await client.role.createMany({
      data: allRoles,
    });
    console.log("Added default roles data");

    // * ----- Default user ------

    const dbRole = await client.role.findUnique({
      where: {
        name: roles.superAdmin,
      },
    });
    await client.company.create({
      data: {
        name: "Reboot Soluções",
        cnpj: '13200397748',
        slug: 'reboot-solucoes',
      }
    })

    if (dbRole) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash(env.defaultPassword, salt);
      await client.user.create({
        data: {
          name: "Ronan Rodrigues",
          email: "ronanr@weg.net",
          password: `${password}`,
          companyId: 1,
          status: `approved`,
          roleId: dbRole.id,
        },
      });
    }

    console.log("Added default admin users");
    // * ------Permissions------
    let allPermissions: Array<{ name: string }> = [];
    Object.values(permissions).forEach((permission) => {
      Object.values(modules).forEach((unitModule) => {
        allPermissions.push({
          name: `${permission} ${unitModule}`,
        });
      });
    });

    await client.permission.createMany({
      data: allPermissions,
    });
    console.log("Added default permissions data");

    const totalPermissions = await client.permission.findMany();
    const adminRole = await client.role.findUnique({
      where: { name: roles.admin },
    });

    const superAdminRole = await client.role.findUnique({
      where: { name: roles.superAdmin },
    });

    let adminPermissions: Array<{ roleId: number; permissionId: number }> = [];
    if (adminRole && superAdminRole) {
      totalPermissions.forEach((permission) => {
        if (permission.name != "user") {
          adminPermissions.push(
            {
              roleId: adminRole.id,
              permissionId: permission.id,
            },
            {
              roleId: superAdminRole.id,
              permissionId: permission.id,
            }
          );
        } else {
          adminPermissions.push({
            roleId: superAdminRole.id,
            permissionId: permission.id,
          });
        }
      });
    }

    // * ----- Roles/Permissions -----
    await client.role_permission.createMany({
      data: adminPermissions,
    });
    console.log("Added default permissions to roles data");
    await client.category.create({
      data: {
        name: "general", slug: "general", lang: "pt-br"
      }
    })

    for (const k in produtos) {
      await client.product.create({
        data: {
          name: produtos[k].descricao,
          estoque: produtos[k].estoque,
          value: produtos[k].valor,
          picture: produtos[k].imagen,
          status: produtos[k].status,
          ean: produtos[k].ean,
          lang: "pt-BR",
          slug: produtos[k].descricao.replace(/ /g, '-'),
          categoryId: 1,
        }
      })
    }

    console.log("Added products");



    console.log("Added default states and cities");
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await client.$disconnect();
  }
};
load();
