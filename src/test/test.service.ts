import { faker } from '@faker-js/faker/locale/vi';
import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'libs/database.module';
import { CreateAccountDTO } from 'src/account/dto/create.account.dto';
import { CreateProductDTO } from 'src/product/dto/create.product.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TestService {
  @Inject()
  private readonly prisma: PrismaService;

  async mockData() {
    const dataAccount: CreateAccountDTO[] = [
      {
        name: 'Data Scientist',
        email: 'data.scientist@gmail.com',
        phoneNumber: '0977995566',
        address: 'Quận 1, TP Hồ Chí Minh',
        dayOfBirth: new Date(12, 5, 1999),
        avatar:
          'https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-4.jpg',
        gender: 'male',
        role: 'DataScientist',
      },
      {
        name: 'Shop Owner',
        email: 'shop.owner@gmail.com',
        phoneNumber: '0977335599',
        address: 'Quận 1, TP Hồ Chí Minh',
        dayOfBirth: new Date(12, 5, 1987),
        avatar:
          'https://mas.edu.vn/wp-content/uploads/2022/05/anh-meo-cute-the-luoi-hai-huoc.jpg',
        gender: 'male',
        role: 'ShopOwner',
      },
      {
        name: 'Nguyễn Văn Thiện',
        email: 'customer@gmail.com',
        phoneNumber: '0933115566',
        address: 'Quận 1, TP Hồ Chí Minh',
        dayOfBirth: new Date(12, 5, 2003),
        avatar:
          'https://qpet.vn/wp-content/uploads/2023/03/avatar-meo-cute-4.jpg.webp',
        gender: 'male',
        role: 'Customer',
      },
    ];
    for (const data of dataAccount) {
      const accountId = uuidv4().toString();
      const userId = uuidv4().toString();
      const salt = await bcrypt.genSalt();
      if (data.role !== 'Customer') {
        const { role, ...dataOwner } = data;
        await this.prisma.account.create({
          data: {
            id: accountId,
            username: data.email,
            password: await bcrypt.hash('123465', salt),
            role: role,
            code: faker.string.numeric(5),
            shopOwner: {
              create: { ...dataOwner, id: userId },
            },
          },
        });
        await this.prisma.shop.create({
          data: {
            id: uuidv4().toString(),
            name: 'PotaStore',
            address: 'Thủ Đức, TP Hồ Chí Minh',
            phoneNumber: data.phoneNumber,
            shopOwner: { connect: { id: userId } },
          },
        });
      } else {
        const cartId = uuidv4().toString();
        const { role, ...dataCus } = data;
        await this.prisma.account.create({
          data: {
            id: accountId,
            username: data.email,
            password: await bcrypt.hash('123465', salt),
            role: role,
            code: faker.string.numeric(5),
            customer: {
              create: {
                ...dataCus,
                id: userId,
                cart: { create: { id: cartId, total: 0 } },
              },
            },
          },
        });
      }
    }

    const dataCategory: string[] = [
      'Apple',
      'Banana',
      'Carrot',
      'Corn',
      'Orange',
      'Strawberry',
      'Tomato',
    ];
    for (const data of dataCategory) {
      const categoryId = uuidv4().toString();
      await this.prisma.category.create({
        data: { id: categoryId, name: data },
      });
    }

    const shop = await this.prisma.shop.findMany();
    const categories = await this.prisma.category.findMany();
    const dataProduct: CreateProductDTO[] = [];
    for (const category of categories) {
      if (category.name === dataCategory[0]) {
        dataProduct.push(
          {
            name: 'Breeze Apple',
            code: 'SP' + faker.string.numeric(4),
            typeId: category.id,
            description:
              'Apples are moderately sweet and crispy depending on the season. At the beginning of the season, apples often have a slightly sour taste and are hard and crunchy, but as the season progresses, the apples become sweeter and less crunchy.',
            price: faker.number.int({ min: 10, max: 99 }) * 1000,
            quantity: faker.number.int({ min: 5, max: 50 }),
            unit: 'trái',
            image:
              'https://tfruit.com.vn/wp-content/uploads/2020/05/t%C3%A1o-breeze.jpg',
          },
          {
            name: 'Queen Apple',
            code: 'PR-' + faker.string.numeric(4),
            typeId: category.id,
            description:
              'Queen apples are a type of apple widely used in Europe. In the Vietnamese market, Queen apples are imported from New Zealand and the US. Queen apples are round or bell-shaped. Hard, crunchy and sweet.',
            price: faker.number.int({ min: 10, max: 99 }) * 1000,
            quantity: faker.number.int({ min: 5, max: 50 }),
            unit: 'trái',
            image:
              'https://tfruit.com.vn/wp-content/uploads/2020/05/t%C3%A1o-queen.jpg',
          },
          {
            name: 'American Koru Apple',
            code: 'PR-' + faker.string.numeric(4),
            typeId: category.id,
            description:
              'American Koru apples are round, dark red, thin-skinned, hard and sweet. Koru apples are in season from November to February or last until April. However, the consumption of this apple in the Vietnamese market is still low.',
            price: faker.number.int({ min: 10, max: 99 }) * 1000,
            quantity: faker.number.int({ min: 5, max: 50 }),
            unit: 'trái',
            image:
              'https://tfruit.com.vn/wp-content/uploads/2020/02/tao-koru-my.jpg',
          },
          {
            name: 'France Juliet Apple',
            code: 'PR-' + faker.string.numeric(4),
            typeId: category.id,
            description:
              'French juliet apples are an apple variety grown according to organic standards. Apples are sweet and crispy and have small skins of 160-180g/fruit. Apples are highly stable throughout the season. Currently, the season for this apple falls from January to April.',
            price: faker.number.int({ min: 10, max: 99 }) * 1000,
            quantity: faker.number.int({ min: 5, max: 50 }),
            unit: 'trái',
            image:
              'https://tfruit.com.vn/wp-content/uploads/2019/12/t%C3%A1o-juliet-s100.jpg',
          },
        );
      } else if (category.name === dataCategory[1]) {
        dataProduct.push(
          {
            name: 'Barangan Banana',
            code: 'PR-' + faker.string.numeric(4),
            typeId: category.id,
            description:
              'Barangan bananas are grown primarily in Malaysia. They are a small and sweet variety that is both popular in Malaysia and exported by them. You will find that many of the world’s largest banana producing nations consume a very high portion of the bananas they grow. Not unexpectedly, barangan bananas are difficult to find for sale in the United States.',
            price: faker.number.int({ min: 10, max: 99 }) * 1000,
            quantity: faker.number.int({ min: 5, max: 50 }),
            unit: 'trái',
            image:
              'https://www.liveeatlearn.com/wp-content/uploads/2023/08/barangan-banana.jpg',
          },
          {
            name: 'Bluggoe Banana',
            code: 'PR-' + faker.string.numeric(4),
            typeId: category.id,
            description:
              'Bluggoe bananas are a large starchy banana native to Ecuador. They are fairly cold resistant, so they are also grown in the United States though we import most of the bananas we eat.',
            price: faker.number.int({ min: 10, max: 99 }) * 1000,
            quantity: faker.number.int({ min: 5, max: 50 }),
            unit: 'trái',
            image:
              'https://www.liveeatlearn.com/wp-content/uploads/2023/08/bluggoe-banana.jpg',
          },
          {
            name: 'Burro Banana',
            code: 'PR-' + faker.string.numeric(4),
            typeId: category.id,
            description:
              'Burro bananas are native to Central and South America, but mostly grown in Mexico. They are cooking bananas often used in both sweet and savory cuisines to include Thai and Indian.',
            price: faker.number.int({ min: 10, max: 99 }) * 1000,
            quantity: faker.number.int({ min: 5, max: 50 }),
            unit: 'trái',
            image:
              'https://www.liveeatlearn.com/wp-content/uploads/2023/08/burro-banana.jpg',
          },
          {
            name: 'GRros Michel Banana',
            code: 'SP' + faker.string.numeric(4),
            typeId: category.id,
            description:
              'Gros Michel Bananas are also known as the Big Mike. They were the USA’s favorite banana until the 1950s when the Panama Disease so severely limited production that the major banana companies switched their focus to the Cavendish. Big Mike bananas are larger than Cavendish and grown primarily in Ecuador, Panama, and columbia.',
            price: faker.number.int({ min: 10, max: 99 }) * 1000,
            quantity: faker.number.int({ min: 5, max: 50 }),
            unit: 'trái',
            image:
              'https://www.liveeatlearn.com/wp-content/uploads/2023/08/gros-michel-banana.jpg',
          },
        );
      } else if (category.name === dataCategory[2]) {
        dataProduct.push(
          {
            name: 'Nantes Carrot',
            code: 'PR-' + faker.string.numeric(4),
            typeId: category.id,
            description:
              'Nantes Carrots produce sweet, crisp, 15-18cm cylindrical carrots, with blunt tips. Nantes carrots perform better in heavier, rockier soils where other carrot types twist and fork. They’re less likely to form pithy cores when left in the field than Chantenay carrots.',
            price: faker.number.int({ min: 10, max: 99 }) * 1000,
            quantity: faker.number.int({ min: 5, max: 50 }),
            unit: 'củ',
            image:
              'https://www.grow-it-organically.com/images/xcarrot-varieties-scarlet-nantes-burpee-prod000638-s.jpg.pagespeed.ic.lZ6UH52jMA.webp',
          },
          {
            name: 'Imperator Carrot',
            code: 'PR-' + faker.string.numeric(4),
            typeId: category.id,
            description:
              'Imperator carrots are the classic long, tapered roots you see in stores. Soil has to be prepared to fine tilth at least a foot deep to grow Imperator carrots. A light, sandy loam soil is ideal for growing Imperator carrots. Choose shorter varieties if your soil is heavy or rock',
            price: faker.number.int({ min: 10, max: 99 }) * 1000,
            quantity: faker.number.int({ min: 5, max: 50 }),
            unit: 'củ',
            image:
              'https://www.grow-it-organically.com/images/carrot-variety-autumn-king1-seedsnow-shut-l.jpg',
          },
          {
            name: 'Chantenay Carrot',
            code: 'PR-' + faker.string.numeric(4),
            typeId: category.id,
            description:
              'Chantenay carrots are short and stout, with broad 4-8cm crowns tapering quickly to a rounded point 15cm away. Before Nantes varieties were developed, these cone-shaped carrots were the only choice for gardeners growing carrots in heavy or rocky soils. They are still a favorite among home gardeners, but older carrots develop a woody core, so harvest Chantenay carrots at 15-18cm.',
            price: faker.number.int({ min: 10, max: 99 }) * 1000,
            quantity: faker.number.int({ min: 5, max: 50 }),
            unit: 'củ',
            image:
              'https://www.grow-it-organically.com/images/carrot-varieties-chantenay-burpee-prod001114-s.jpg',
          },
          {
            name: 'Mini Carrot',
            code: 'PR-' + faker.string.numeric(4),
            typeId: category.id,
            description: '',
            price: faker.number.int({ min: 10, max: 99 }) * 1000,
            quantity: faker.number.int({ min: 5, max: 50 }),
            unit: 'củ',
            image:
              'https://www.grow-it-organically.com/images/growing-carrots-babette1-lg.jpg',
          },
        );
      } else if (category.name === dataCategory[3]) {
        dataProduct.push(
          {
            name: 'Dent Corn',
            code: 'PR-' + faker.string.numeric(4),
            typeId: category.id,
            description:
              'Dent corn, also called field corn, is the most widely grown corn in the U.S. It is used primarily for livestock feed, but it is also used in some food products. It contains a mix of hard and soft starches that become indented once the corn is dried, thus the name dent corn.',
            price: faker.number.int({ min: 10, max: 99 }) * 1000,
            quantity: faker.number.int({ min: 5, max: 50 }),
            unit: 'trái',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/YellowCorn.jpg/1200px-YellowCorn.jpg',
          },
          {
            name: 'Sweet Corn',
            code: 'PR-' + faker.string.numeric(4),
            typeId: category.id,
            description:
              'Sweet corn, or “corn on the cob,” is almost all soft starch and will never pop. It contains more sugar than other types of corn. Unlike other corns that are picked when the kernels are dry and mature, sweet corn is picked and eaten while the ears are in the immature milk stage and the kernels are tender.',
            price: faker.number.int({ min: 10, max: 99 }) * 1000,
            quantity: faker.number.int({ min: 5, max: 50 }),
            unit: 'trái',
            image:
              'https://images-handler.kamereo.vn/eyJidWNrZXQiOiJpbWFnZS1oYW5kbGVyLXByb2QiLCJrZXkiOiJzdXBwbGllci82NTQvUFJPRFVDVF9JTUFHRS8yYWUzMzg4NC04MWMwLTQ1MGEtYmFiNS01YjFiNGExZTRjZjkucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDAsImhlaWdodCI6NTAwLCJmaXQiOiJmaWxsIn19fQ==',
          },
          {
            name: 'Flint Corn',
            code: 'PR-' + faker.string.numeric(4),
            typeId: category.id,
            description:
              'Flint corn, also known as Indian corn, is similar to dent corn. It has a hard outer shell and is distinguished by a wide range of colors. It is grown mostly in Central and South America and used primarily for decoration in North America around harvest time.',
            price: faker.number.int({ min: 10, max: 99 }) * 1000,
            quantity: faker.number.int({ min: 5, max: 50 }),
            unit: 'trái',
            image:
              'https://hudsonvalleyseed.com/cdn/shop/products/Otto-File-Flint-Corn-vendor-unknown-1630677255.jpg?v=1630677262',
          },
        );
      } else if (category.name === dataCategory[4]) {
        dataProduct.push(
          {
            name: 'Navel Orange',
            code: 'PR-' + faker.string.numeric(4),
            typeId: category.id,
            description:
              'Navel oranges are one of the most popular kinds of oranges out there. They are prized for their high vitamin C content, low acid content, and delectable sweetness. They’re known by the small growth at the bottom of the fruit, which resembles a human navel.',
            price: faker.number.int({ min: 10, max: 99 }) * 1000,
            quantity: faker.number.int({ min: 5, max: 50 }),
            unit: 'trái',
            image:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKeZXkNS7Hd4WWCwTC9PggQratXxVMYhFqtA&s',
          },
          {
            name: 'Blood Orange',
            code: 'SP' + faker.string.numeric(4),
            typeId: category.id,
            description:
              'The blood orange stands out from every other type of orange due to its bright red flesh. Blood oranges are also smaller than navel oranges but a bit bigger than tangerines. Blood oranges have a unique flavor that tastes somewhat of oranges mixed with raspberries.',
            price: faker.number.int({ min: 10, max: 99 }) * 1000,
            quantity: faker.number.int({ min: 5, max: 50 }),
            unit: 'trái',
            image:
              'https://www.diggers.com.au/cdn/shop/products/Orange-Arnolds-Blood-Orange-Citrange-WCITAR_3a7e0ba4-3d69-4f5c-8dd4-8842b490e54d_2048x.jpg?v=1666070592',
          },
          {
            name: 'Seville Orange',
            code: 'PR-' + faker.string.numeric(4),
            typeId: category.id,
            description:
              'Seville oranges are also known as sour oranges. Due to their high acidity, they’re not typically peeled to eat as snack, but are used for cooking. Many people use sour oranges to make marmalade, salad dressings, or sauces.',
            price: faker.number.int({ min: 10, max: 99 }) * 1000,
            quantity: faker.number.int({ min: 5, max: 50 }),
            unit: 'trái',
            image:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXIbCN2X1avSkAC4FTBfuJL3uNf-aDMNtwLw&s',
          },
        );
      } else if (category.name === dataCategory[5]) {
        dataProduct.push(
          {
            name: 'Honeoye Strawberry',
            code: 'PR-' + faker.string.numeric(4),
            typeId: category.id,
            description:
              'Honeoye strawberries are day-neutral June-bearing strawberries. They’re large berries that range in color from bright orange-red to red. They’re true to their name as they taste sweet, like honey. This type of strawberry produces a lot of berries, as it has a high yield and a long growing season.',
            price: faker.number.int({ min: 10, max: 99 }) * 1000,
            quantity: faker.number.int({ min: 5, max: 50 }),
            unit: 'trái',
            image: 'https://www.starkbros.com/images/dynamic/2202.jpg',
          },
          {
            name: 'Earliglow Strawberry',
            code: 'PR-' + faker.string.numeric(4),
            typeId: category.id,
            description: faker.lorem.paragraphs({ min: 3, max: 5 }),
            price: faker.number.int({ min: 10, max: 99 }) * 1000,
            quantity: faker.number.int({ min: 5, max: 50 }),
            unit: 'trái',
            image:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyHmOu5XWw6dp-9bEPF2RmWkDCrtm9HgaEbQ&s',
          },
          {
            name: 'Jewel Strawberry',
            code: 'PR-' + faker.string.numeric(4),
            typeId: category.id,
            description:
              'Jewel strawberries are the picture perfect strawberry. They’re large, red, and juicy. They have an excellent flavor and are high-quality and hearty. They also have longer season yields.',
            price: faker.number.int({ min: 10, max: 99 }) * 1000,
            quantity: faker.number.int({ min: 5, max: 50 }),
            unit: 'trái',
            image:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU0PkgxejU_LntJZHIdGoTT_BLJs5-M_1kQA&s',
          },
        );
      } else {
        dataProduct.push(
          {
            name: 'Standard Globe Tomato',
            code: 'PR-' + faker.string.numeric(4),
            typeId: category.id,
            description:
              'These are 2 to 3 inches (5 to 7 cm) wide with a more tart, acidic taste. They’re perfect for slicing and eating raw, but can also be cooked into sauce (though they may need more cooking time to evaporate all their juices)',
            price: faker.number.int({ min: 10, max: 99 }) * 1000,
            quantity: faker.number.int({ min: 5, max: 50 }),
            unit: 'trái',
            image:
              'https://www.liveeatlearn.com/wp-content/uploads/2019/05/common-types-of-tomatoes-14.jpg',
          },
          {
            name: 'Beefsteak Tomato',
            code: 'SP' + faker.string.numeric(4),
            typeId: category.id,
            description:
              'These guys are big and heavy, with a meaty texture. Their big size makes them perfect for adding to caprese sandwiches, mushroom burgers, or stacking with mozzarella and basil (hellooo caprese!)',
            price: faker.number.int({ min: 10, max: 99 }) * 1000,
            quantity: faker.number.int({ min: 5, max: 50 }),
            unit: 'trái',
            image:
              'https://www.liveeatlearn.com/wp-content/uploads/2019/05/common-types-of-tomatoes-12-1024x662.jpg',
          },
        );
      }
      for (const data of dataProduct) {
        const productId = uuidv4().toString();
        const { typeId, ...product } = data;
        await this.prisma.product.create({
          data: {
            id: productId,
            ...product,
            createdDate: new Date(),
            category: { connect: { id: typeId } },
            shop: { connect: { id: shop[0].id } },
          },
        });
      }
    }
  }
}
