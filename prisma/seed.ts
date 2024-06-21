const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  try {
    const computersAndLaptopsCategory = await prisma.category.create({
      data: {
        name: "Computadores e Laptops",
        slug: "computers-and-laptops",
        imageUrl:
          "https://utfs.io/f/42200bf7-b961-44ab-b6fc-50abc9784a34-3l9vss.png",
      },
    });

    const computersAndLaptops = [
      {
        name: "Notebook Lenovo Ideapad 1i Intel Core I5-1235u 8gb 512gb 15.6”",
        slug: "notebook-lenovo-ideapad-1i-intel-core-i5-1235u-8gb-512gb-156",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/92659e3c-c8ce-4750-a0f1-cb5f2471ef2a-hkbtrs.png",
          "https://utfs.io/f/af80a8c7-2ce3-4b77-a803-66cbca006c11-yivogn.png",
          "https://utfs.io/f/7808549c-dc8c-4a1a-8ec3-1c4ef60a7876-jjoitm.png",
          "https://utfs.io/f/1eb8b18b-511c-459c-a7af-49b6e49b0862-2l4o4r.png",
        ],
        basePrice: 3599.9,
        categoryId: computersAndLaptopsCategory.id,
        discountPercentage: 0,
      },
      {
        name: "Notebook Asus Vivobook 15 Intel Pentium Gold 4GB 128GB SSD Tela 15,6” e Windows 11",
        slug: "notebook-asus-vivobook-15-intel-pentium-gold-4gb-128gb-ssd-tela-156-e-windows-11",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/82d6d602-2cee-4c32-8530-9e14f982818a-wx3a5n.png",
          "https://utfs.io/f/099388f3-45c3-40ca-b159-9bd955f6e15b-cbznqi.png",
          "https://utfs.io/f/099388f3-45c3-40ca-b159-9bd955f6e15b-cbznqi.png",
          "https://utfs.io/f/7b7e662c-2c3a-490c-8c47-b6a0fa808eb5-su7l3s.png",
        ],
        basePrice: 2018.41,
        categoryId: computersAndLaptopsCategory.id,
        discountPercentage: 0,
      },
      {
        name: "Notebook Acer Nitro 5 AN515-58-54UH Ci5 12ª Gen Windows 11 Home 8GB 512GB RTX 3050 15.6” Full HD",
        slug: "notebook-acer-nitro-5-an515-58-54uh-ci5-12-gen-windows-11-home-8gb-512gb-rtx-3050-156-full-hd",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/c4507bd8-2256-4420-9ed2-6a3fea345bd2-v2yz7a.png",
          "https://utfs.io/f/76e3ad15-d535-4859-8761-3d0cbd708ba4-jd1gcp.png",
          "https://utfs.io/f/06e7bf3f-804f-47a7-8406-2d7066e3ca66-18262g.png",
          "https://utfs.io/f/0d3694db-403a-461e-828f-ba8cdce21f12-lt5shl.png",
        ],
        basePrice: 6999.0,
        categoryId: computersAndLaptopsCategory.id,
        discountPercentage: 0,
      },
      {
        name: "Computador Gamer, AMD Ryzen 7 5700X, GeForce RTX 4060 Ti 8GB, 16GB DDR4, SSD M.2 480GB",
        slug: "computador-gamer-amd-ryzen-7-5700x-geforce-rtx-4060-ti-8gb-16gb-ddr4-ssd-m-2-480gb",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/e19005f1-bc02-4aee-b041-1be1802108a7-5e18uf.png",
          "https://utfs.io/f/dc6e17e3-ce27-43a6-bc21-092f8f27e513-syok54.png",
          "https://utfs.io/f/38ce7620-3963-49ee-a76a-1256091b097f-7ppouh.png",
          "https://utfs.io/f/6cc73e1a-30d4-46f1-b8b0-8031631d7192-qn0452.png",
        ],
        basePrice: 10238.4,
        categoryId: computersAndLaptopsCategory.id,
        discountPercentage: 32,
      },
      {
        name: "Computador Gamer, Intel i5-13400F, GeForce RTX 4060 8GB, 16GB DDR4, SSD 120GB + HD 1TB",
        slug: "computador-gamer-intel-i5-13400f-geforce-rtx-4060-8gb-16gb-ddr4-ssd-120gb-hd-1tb",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/774b1787-0c42-4dfe-b53b-3f6369bb81aa-2otete.png",
          "https://utfs.io/f/e405dc9e-df6e-41d2-87ce-acf59c8a481d-ilc4xv.png",
          "https://utfs.io/f/cd355111-064e-4890-ae0c-6b0fb5e4e67c-yhuv2c.png",
          "https://utfs.io/f/41663d02-c74e-4073-88d6-db19c3edd121-kmqgsb.png",
        ],
        basePrice: 8174.0,
        categoryId: computersAndLaptopsCategory.id,
        discountPercentage: 34,
      },
      {
        name: "Computador Gamer, Intel i7-12700F, GeForce RTX 3050 6GB, 16GB DDR4, SSD 120GB, HD 1TB",
        slug: "computador-gamer-intel-i7-12700f-geforce-rtx-3050-6gb-16gb-ddr4-ssd-120gb-hd-1tb",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/94e6ebb2-321a-48c1-8a96-dfe857202339-uag134.png",
          "https://utfs.io/f/cf0b895f-5d8d-48ef-a9e1-32782158348a-edxayn.png",
          "https://utfs.io/f/b7e64e77-c828-4177-908e-a2d236c27fa8-1ilf5u.png",
          "https://utfs.io/f/7be5025e-b8e1-4740-b247-2673219f40b0-hf45ab.png",
        ],
        basePrice: 8450.0,
        categoryId: computersAndLaptopsCategory.id,
        discountPercentage: 33,
      },
    ];

    await prisma.product.createMany({
      data: computersAndLaptops,
    });

    const gamesAndConsolesCategory = await prisma.category.create({
      data: {
        name: "Games e Consoles",
        slug: "games-and-consoles",
        imageUrl:
          "https://utfs.io/f/d490a0db-39bb-41a0-be58-6cd44b5d292b-4gnj3s.png",
      },
    });

    const gamesAndConsoles = [
      {
        name: "Microsoft Xbox Series S 512gb Standard Cor Branco",
        slug: "microsoft-xbox-series-s-512gb-standard-cor-branco",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/248309ff-682b-49d7-b6fc-e1f86ef47bfd-21pux8.png",
          "https://utfs.io/f/d180b003-0886-4499-8f7a-a0c06d6432e2-wazy2b.png",
          "https://utfs.io/f/d256e221-c2f9-4f03-b0a0-f6c6fca5d082-4deaxa.png",
          "https://utfs.io/f/672e0d44-207a-4318-830d-72abea63ee5c-tzbi29.png",
        ],
        basePrice: 2376.0,
        categoryId: gamesAndConsolesCategory.id,
        discountPercentage: 0,
      },
      {
        name: "Console Playstation 5 Sony, SSD 825GB, Controle sem fio DualSense, Com Mídia Física, Branco",
        slug: "console-playstation-5-sony-ssd-825gb-controle-sem-fio-dualsense-com-midia-fisica-branco",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/5c426b1f-aa34-4d0a-9985-d7bf1bba685f-rnjyfp.png",
          "https://utfs.io/f/63da205f-e719-4868-bf1d-be365e3ca897-9o5h8q.png",
          "https://utfs.io/f/1bfa1f84-6b92-4514-8fb2-cf8ad8799bc3-o1951z.png",
          "https://utfs.io/f/c6471a04-3612-4848-94f2-92310a3fe31d-dagamg.png",
        ],
        basePrice: 3999.9,
        categoryId: gamesAndConsolesCategory.id,
        discountPercentage: 7,
      },
      {
        name: "Console Nintendo Switch Oled com Joy-Con, Branco",
        slug: "console-nintendo-switch-oled-com-joy-con-branco",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/74e44737-2372-419e-8a36-7f8d77f3e6e8-92bxn3.png",
          "https://utfs.io/f/1ceaea65-afe3-48e2-90ca-4a04680fd58a-7w7x1s.png",
          "https://utfs.io/f/d24861c7-646b-4ea5-9b7a-bdbbd9534ef2-ourrqn.png",
          "https://utfs.io/f/e7ef5f52-8558-448e-8a22-2a729841f08f-t7sfjm.png",
        ],
        basePrice: 2420.95,
        categoryId: gamesAndConsolesCategory.id,
        discountPercentage: 9,
      },
      {
        name: "Jogo The Last of Us Part II Remastered, PS5",
        slug: "jogo-the-last-of-us-part-ii-remastered-ps5",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/781a531e-4eaa-44e0-8c46-176a5c554d7b-z8l3w3.png",
          "https://utfs.io/f/a17affc0-7b1c-41da-84e2-5e0163c7063f-jw07yk.png",
          "https://utfs.io/f/16ae31b2-7e17-4eda-802a-88c75180ac18-7qe32c.png",
          "https://utfs.io/f/08c3dc65-dd82-4f85-a711-ac0eb1d3c84b-aze1ut.png",
        ],
        basePrice: 219.91,
        categoryId: gamesAndConsolesCategory.id,
        discountPercentage: 0,
      },
      {
        name: "Jogo GTA V Premium Online Edition PS4",
        slug: "jogo-gta-v-premium-online-edition-ps4",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/e8aeb181-6d76-4350-96c0-b77bb64c26be-iy6azk.png",
          "https://utfs.io/f/34a67af3-488b-4ad9-b75a-bee3be039f78-9e778y.png",
          "https://utfs.io/f/09a8c43a-3983-49f6-b709-7f1f5f87b431-o2lhgz.png",
          "https://utfs.io/f/f9fc9707-ed74-4784-95ab-06b43d3b87c8-wa4aa4.png",
        ],

        basePrice: 89.91,
        categoryId: gamesAndConsolesCategory.id,
        discountPercentage: 0,
      },
      {
        name: "Red Dead Redemption II para Xbox One - Rockstar Games",
        slug: "red-dead-redemption-ii-para-xbox-one-rockstar-games",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/8132eb73-c65a-4420-bd9e-7faf4050f6d1-lchvcr.png",
          "https://utfs.io/f/79c987ef-9209-4042-8a8d-4ff5f4a0c670-zf7j4b.png",
          "https://utfs.io/f/aa0195ec-9456-471b-9134-f8eaa729aaeb-w67kbu.png",
          "https://utfs.io/f/87ff9cd9-bf18-42a3-8ab1-12778196fb6d-sx7ljd.png",
        ],
        basePrice: 163.88,
        categoryId: gamesAndConsolesCategory.id,
        discountPercentage: 0,
      },
    ];

    await prisma.product.createMany({
      data: gamesAndConsoles,
    });

    const computerPeripheralsCategory = await prisma.category.create({
      data: {
        name: "Periféricos para Computadores",
        slug: "computer-peripherals",
        imageUrl:
          "https://utfs.io/f/42bb73b3-4a24-4542-aee4-12fa68014dc3-e7tkon.png",
      },
    });

    const computerPeripherals = [
      {
        name: "Logitech MX Master 3s",
        slug: "logitech-mx-master-3s",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/fb1f90af-94da-4bb8-9513-bc62ff991026-otetkp.png",
          "https://utfs.io/f/144bde6e-d12a-4891-8070-f57a55ff0ef3-x6ep3u.png",
          "https://utfs.io/f/e1f5d0c6-2a44-459c-98ae-d6e839b5c1f3-thphc5.png",
          "https://utfs.io/f/74a69494-b662-478f-8f22-1382c15e0da2-l4plt0.png",
        ],
        basePrice: 650,
        categoryId: computerPeripheralsCategory.id,
        discountPercentage: 10,
      },
      {
        name: "Logitech Pro X Superlight",
        slug: "logitech-pro-x-superlight",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/6e477c1c-6f31-425d-9296-a3aeb612ad51-idaumz.png",
          "https://utfs.io/f/0323f05b-9d76-49af-803e-18f5825a9932-40f9t2.png",
          "https://utfs.io/f/d54f3cf6-3626-4707-bd9f-32b290b32d98-qe5e93.png",
          "https://utfs.io/f/81e74423-708b-4503-9a34-bdd101343e6b-m98ja0.png",
        ],
        basePrice: 750,
        categoryId: computerPeripheralsCategory.id,
        discountPercentage: 5,
      },
      {
        name: "Logitech G305 Lightspeed",
        slug: "logitech-g305-lightspeed",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/bac91f14-2e7f-422c-a0b7-83b449197e78-6pfvtn.png",
          "https://utfs.io/f/c89bcaed-f495-436f-8d6c-6b6a4936fb1a-t3609o.png",
          "https://utfs.io/f/c8bb036e-d1c4-4a06-bf5e-1866ca22432d-jk7x9f.png",
          "https://utfs.io/f/89ea9752-e0e8-4377-b9b7-2aeb205d1b08-2ti76m.png",
        ],
        basePrice: 300,
        categoryId: computerPeripheralsCategory.id,
        discountPercentage: 15,
      },
      {
        name: "Hyperx Pulsefire Dart",
        slug: "hyperx-pulsefire-dart",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/bcb08040-d58b-4158-af41-8f2914ce1b3b-1xd5uq.png",
          "https://utfs.io/f/49ad2693-e251-4ce4-b4e7-265600349b40-2xbhct.png",
          "https://utfs.io/f/4061795d-6d5b-403b-900e-914256ba3f2e-7s04kc.png",
          "https://utfs.io/f/57f48a12-3c63-4d79-9dbb-006a37f29be5-cmorrv.png",
        ],
        basePrice: 600,
        categoryId: computerPeripheralsCategory.id,
        discountPercentage: 10,
      },
      {
        name: "Razer Deathadder V2 Pro",
        slug: "razer-deathadder-v2-pro",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/880fce67-00b6-4c57-9a7a-ca4b5b76a1a3-5jk68j.png",
          "https://utfs.io/f/3f35dd30-8ed3-4f54-b845-35d92a417f01-m16w6s.png",
          "https://utfs.io/f/5c4bc742-86c1-4e95-9149-6a3c9e1cd79b-wiafu3.png",
          "https://utfs.io/f/0538a4a0-6ccf-4945-b539-ffdee96d1fdd-g0npvu.png",
        ],
        basePrice: 350,
        categoryId: computerPeripheralsCategory.id,
        discountPercentage: 0,
      },
      {
        name: "Logitech MX Keys Mini",
        slug: "logitech-mx-keys-mini",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/c8d2f210-f49b-43dd-a50b-3fd638741f3c-33zg48.png",
          "https://utfs.io/f/5b0ade45-a283-4258-915d-82049839263e-ausijr.png",
          "https://utfs.io/f/08bcf001-e301-4b45-b4ff-d99892269bae-otkh7q.png",
          "https://utfs.io/f/ec525899-da52-4332-ac49-eddf176630a9-w8rm3f.png",
        ],
        basePrice: 650,
        categoryId: computerPeripheralsCategory.id,
        discountPercentage: 10,
      },
      {
        name: "Logitech MX Keys S",
        slug: "logitech-mx-keys-s",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/99bc9c70-d342-4d5d-830a-ebac72a26f6e-m9yl8y.png",
          "https://utfs.io/f/e30a7963-2044-4d7d-b951-50f8a4a00cec-du02k1.png",
          "https://utfs.io/f/eef3389b-38d9-4d32-8a6f-335a744b3448-5e1jv4.png",
          "https://utfs.io/f/bfbbb352-8065-4a67-913d-cd0f4afdea9a-31wytt.png",
        ],
        basePrice: 750,
        categoryId: computerPeripheralsCategory.id,
        discountPercentage: 10,
      },
      {
        name: "Logitech Pop Keys",
        slug: "logitech-pop-keys",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/9bec8b64-7706-44e4-a120-4fef0511f04d-u67teu.png",
          "https://utfs.io/f/429d76db-9e5f-4034-9ddf-793e7d3662c5-58nqzp.png",
          "https://utfs.io/f/cff1388b-b551-44a9-a024-35674978181f-jowbfg.png",
          "https://utfs.io/f/fe104d48-ea29-4af3-907e-e185ef86c8a6-qeno4j.png",
        ],
        basePrice: 440,
        categoryId: computerPeripheralsCategory.id,
        discountPercentage: 5,
      },
      {
        name: "Epomaker TH80",
        slug: "epomaker-th80",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/06759f10-eace-4f96-8913-25905379c47b-t8tglh.png",
          "https://utfs.io/f/c41a11f9-c00d-4fb5-9fe2-3d7a8dbd5926-4b9e6c.png",
          "https://utfs.io/f/40c5bc61-35bf-4092-92ce-e0b595584704-kmao8t.png",
          "https://utfs.io/f/a71cd78c-94b5-465b-9159-60ce12c4b0c0-ph9bb6.png",
        ],
        basePrice: 500,
        categoryId: computerPeripheralsCategory.id,
        discountPercentage: 5,
      },
      {
        name: "Redragon Gamer Ashe",
        slug: "redragon-gamer-ashe",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/2211e048-6ce0-4e6a-934c-6bd2ed3f5a16-b14pyz.png",
          "https://utfs.io/f/ec2f0f48-be0e-4b3c-8c68-53e78842377b-7jaqka.png",
          "https://utfs.io/f/a2c651f1-8999-4aea-b67d-e33387495721-41gr5l.png",
          "https://utfs.io/f/f99a04c1-7ba4-4f5c-9f26-e2e9457dfe90-jmrqw.png",
        ],
        basePrice: 400,
        categoryId: computerPeripheralsCategory.id,
        discountPercentage: 25,
      },
      {
        name: "Logitech Zone Vibe 100",
        slug: "logitech-zone-vibe-100",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/e1e4e870-45dc-4a47-b84c-dd36dc3966df-cuwa00.png",
          "https://utfs.io/f/88f60764-46f4-4f14-905b-8014ffdc1478-guymjj.png",
          "https://utfs.io/f/787ca10b-639e-4464-b33e-3acee010ca1b-ogaiw2.png",
          "https://utfs.io/f/096bae69-4370-4182-873e-44e99fedcdf0-59kdnh.png",
        ],
        basePrice: 750,
        categoryId: computerPeripheralsCategory.id,
        discountPercentage: 10,
      },
      {
        name: "Logitech Pro X 2 Lightspeed",
        slug: "logitech-pro-x-2-lightspeed",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/3a071f07-f26b-4bed-9b3d-da97241fab94-cnu60s.png",
          "https://utfs.io/f/63c837ab-0cce-43f1-8349-ad53ee41c8cf-x8xsfx.png",
          "https://utfs.io/f/99eecaf1-8687-4e87-9743-72aded4fe55f-h72n42.png",
          "https://utfs.io/f/842c89d4-74ff-4e76-b19f-605180947aa9-3e0zb3.png",
        ],
        basePrice: 1200,
        categoryId: computerPeripheralsCategory.id,
        discountPercentage: 5,
      },
      {
        name: "Logitech Astro A30",
        slug: "logitech-astro-a30",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/062f7d1b-7288-4d03-9aec-25b3dcecc5fe-3us24m.png",
          "https://utfs.io/f/51e3bc4b-cc84-4d20-b94d-387b2d56993f-4l6gkb.png",
          "https://utfs.io/f/3eb09737-a841-4a05-a3f4-85acf1bba3d8-d14z98.png",
          "https://utfs.io/f/2ea02ef5-4144-4eba-82d8-2ee0beac73c4-lh3hy5.png",
        ],
        basePrice: 1500,
        categoryId: computerPeripheralsCategory.id,
        discountPercentage: 15,
      },
      {
        name: "Logitech Zone Wired Earbuds",
        slug: "logitech-zone-wired-earbuds",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/30d88e20-2396-4a18-af3d-2e6104284249-l6h1vy.png",
          "https://utfs.io/f/a63a0a6b-92db-485d-b66b-01efc214c9a8-cth6ct.png",
          "https://utfs.io/f/e6780aae-dafb-480d-8acc-fc4258de9f0c-4ghato.png",
          "https://utfs.io/f/de52bf50-5e4d-4d97-90f0-1e21a4d10e7b-3wikph.png",
        ],
        basePrice: 550,
        categoryId: computerPeripheralsCategory.id,
        discountPercentage: 5,
      },
      {
        name: "Hyperx Cloud Stinger 2",
        slug: "hyperx-cloud-stinger-2",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/80a7951a-704c-4587-9b1a-fa255c571fa7-oxvmyz.png",
          "https://utfs.io/f/fa9f505a-a6d1-4cca-ba27-fd11914f1984-ghx4a2.png",
          "https://utfs.io/f/0ebacd33-e99e-4c9c-9096-d840152ec4ac-81yll5.png",
          "https://utfs.io/f/582cf890-b2e3-444c-8609-a58ad837bad9-dzx3s.png",
        ],
        basePrice: 250,
        categoryId: computerPeripheralsCategory.id,
        discountPercentage: 0,
      },
      {
        name: "Logitech Powerplay",
        slug: "logitech-powerplay",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/ce82f1f3-d5cc-4ab9-be28-c160f21d51ea-on5ldd.png",
          "https://utfs.io/f/fc2a1ebe-62b9-435d-8e81-e7c576a51327-x3442a.png",
          "https://utfs.io/f/69cca649-156e-499e-8c85-4bd6ec08ad81-ti1f7x.png",
          "https://utfs.io/f/c1d98ab1-599d-4cba-bf74-ca1832118db9-l22wj0.png",
        ],
        basePrice: 950,
        categoryId: computerPeripheralsCategory.id,
        discountPercentage: 10,
      },
      {
        name: "Logitech Desk Mat",
        slug: "logitech-desk-mat",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/6f21bed2-ec90-4e38-b1e9-9a20b9dd2627-n9raei.png",
          "https://utfs.io/f/2072895f-71d4-4c88-8594-0baef2d65212-1nss0n.png",
          "https://utfs.io/f/577542f2-5aff-4667-97ab-28bd678c4089-qlcufs.png",
          "https://utfs.io/f/d398e45b-ad7b-4ac9-b6a6-35d78c3e1f39-ji7547.png",
        ],
        basePrice: 150,
        categoryId: computerPeripheralsCategory.id,
        discountPercentage: 0,
      },
      {
        name: "Logitech G740",
        slug: "logitech-g740",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/ff79fbb0-1077-41f2-be72-014fdc655a43-culmza.png",
          "https://utfs.io/f/08e1ea2b-2024-461b-b42b-f2bbfe34167c-gv99k9.png",
          "https://utfs.io/f/2ba3c777-c399-4d2f-ab66-c604615b20e7-ofzvvc.png",
          "https://utfs.io/f/d1ebd92c-e0d9-4c08-9a90-4bd8c18bdd3a-59v0o7.png",
        ],
        basePrice: 200,
        categoryId: computerPeripheralsCategory.id,
        discountPercentage: 5,
      },
      {
        name: "Logitech Mousepad Studio Series",
        slug: "logitech-mousepad-studio-series",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/101670c3-157e-4646-a1fa-37d274ecfb4a-k45quc.png",
          "https://utfs.io/f/20dc1843-2d3b-47cf-9c7e-f5d5f339e5d1-dcr81v.png",
          "https://utfs.io/f/1144e048-56c3-4d2a-b010-0dba2a27e7f3-6lcp9e.png",
          "https://utfs.io/f/68aa7357-311f-4d77-9948-4190b94d726d-61tj3.png",
        ],
        basePrice: 250,
        categoryId: computerPeripheralsCategory.id,
        discountPercentage: 15,
      },
      {
        name: "Force One Skyhawk Dark",
        slug: "force-one-skyhawk-dark",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/a93a5d0c-f83e-4bcc-8701-0cd1a51e6d3b-x7k2s6.png",
          "https://utfs.io/f/68a1b796-9404-4406-bef0-0852f9c05db6-zcern9.png",
          "https://utfs.io/f/3eb05751-b4a9-40e8-a341-dc2064ae92fc-xjulgs.png",
          "https://utfs.io/f/f506757e-c022-4480-b55c-883618cc48d8-vezwlp.png",
        ],
        basePrice: 300,
        categoryId: computerPeripheralsCategory.id,
        discountPercentage: 10,
      },
      {
        name: "Dell S2421HN",
        slug: "dell-s2421hn",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/747e479b-e649-45d8-bb6f-60562efa4ab2-l17xro.png",
          "https://utfs.io/f/db357c99-69cb-4ebb-925a-de114b5fde39-te7tat.png",
          "https://utfs.io/f/bfb6e6bc-1e32-4422-a409-d9f1215c70a8-x9wd56.png",
          "https://utfs.io/f/3bbf20c8-4afa-4984-a5ca-d16e6586d9c4-owwhm1.png",
        ],
        basePrice: 1500,
        categoryId: computerPeripheralsCategory.id,
        discountPercentage: 15,
      },
      {
        name: "Dell P2422H",
        slug: "dell-p2422h",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/c3f8e1af-5c6d-43ef-ba6c-d8fb4fb52883-rax9q4.png",
          "https://utfs.io/f/e78e87a7-ef92-487f-938e-11aeaa16cc23-w5lwxn.png",
          "https://utfs.io/f/96337633-6334-4a09-be62-7a5963f19522-y0thty.png",
          "https://utfs.io/f/f33a5572-d119-4d25-9784-3b0907add4d5-t64umf.png",
        ],
        basePrice: 2000,
        categoryId: computerPeripheralsCategory.id,
        discountPercentage: 5,
      },
      {
        name: "Dell P2723QE",
        slug: "dell-p2723qe",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/3f5ddf97-4aa6-434f-8e76-ad8256e8cfcb-60cp0c.png",
          "https://utfs.io/f/7fc2873b-1c6c-430d-9d1f-4e5399635ce3-2cn6it.png",
          "https://utfs.io/f/b653bf13-9482-431e-98cd-fc193f27174a-apn21y.png",
          "https://utfs.io/f/2fbb129a-be25-4604-9304-6531f1e9f8d4-j2mxl3.png",
        ],
        basePrice: 2500,
        categoryId: computerPeripheralsCategory.id,
        discountPercentage: 0,
      },
      {
        name: "Dell S3422DWG",
        slug: "dell-s3422dwg",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/91436dc7-f34e-4e4c-9f0d-f12e21ba42ad-1wl9gu.png",
          "https://utfs.io/f/89a15b86-c713-4909-99c1-4a141d7849c7-qu5bvz.png",
          "https://utfs.io/f/d4abe8fc-b402-4efb-8b4b-5526c6e81f84-j9eno0.png",
          "https://utfs.io/f/aba13c89-ae52-4039-9052-82513ac6f4f2-5o5er5.png",
        ],
        basePrice: 3200,
        categoryId: computerPeripheralsCategory.id,
        discountPercentage: 0,
      },
      {
        name: "Dell S3222DGM",
        slug: "dell-s3222dgm",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/bfd0b319-162b-4bca-ac27-6c3e18b7da32-yi0au.png",
          "https://utfs.io/f/746ab722-0676-4701-bba5-bd3f59db73a1-pw22pz.png",
          "https://utfs.io/f/496d57e0-4198-4f27-ad44-c35e766e2dde-k7hwu0.png",
          "https://utfs.io/f/3b439b75-e221-4e65-9612-ea2f01feae7b-4q25l5.png",
        ],
        basePrice: 3500,
        categoryId: computerPeripheralsCategory.id,
        discountPercentage: 0,
      },
      {
        name: "Logitech Surround Sound Z607",
        slug: "logitech-surround-sound-z607",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/73915a92-31a3-4195-9883-88d6dbc6d321-b5j8co.png",
          "https://utfs.io/f/da3292ef-42b7-4be2-ac4d-b9d45e6931d4-4e4pk7.png",
          "https://utfs.io/f/3c591cb9-4bb7-4e4b-a1c5-4f98b969dd21-2d9t8a.png",
          "https://utfs.io/f/94223f93-5b95-4538-8cd2-dbafc9271928-94oc0r.png",
        ],
        basePrice: 1200,
        categoryId: computerPeripheralsCategory.id,
        discountPercentage: 5,
      },
      {
        name: "Logitech Dock",
        slug: "logitech-dock",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/a35e6fb8-d5c5-4121-9766-e39b805bcc1e-cukwpp.png",
          "https://utfs.io/f/ae6c099f-16dd-492f-8f80-09d7091502e0-gv9ztu.png",
          "https://utfs.io/f/1bd03dd4-a24c-4c55-8a5e-b45f72acb891-ofz5lr.png",
          "https://utfs.io/f/9b0c5a00-b621-4a02-bb6c-33e2513b8e64-59vqxs.png",
        ],
        basePrice: 4500,
        categoryId: computerPeripheralsCategory.id,
        discountPercentage: 15,
      },
      {
        name: "Sony SA-Z9R Speakers",
        slug: "sony-sa-z9r-speakers",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/559f6fec-014b-46a4-8601-bd839e3fafbf-o2pxdo.png",
          "https://utfs.io/f/c1d91fe0-349c-41cb-b023-42dbf97b7df5-j81a65.png",
          "https://utfs.io/f/30f3f217-e741-480c-9e6c-f59134d4de90-edcmym.png",
          "https://utfs.io/f/98cedf85-5e6e-4936-8263-bef6dc843316-9inzr3.png",
        ],
        basePrice: 4000,
        categoryId: computerPeripheralsCategory.id,
        discountPercentage: 10,
      },
      {
        name: "Sony XB43 Extra Bass",
        slug: "sony-xb43-extra-bass",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/04d15917-10b8-4fe3-ba60-26c94f7acfae-gxgbj0.png",
          "https://utfs.io/f/93877715-c7ed-44b8-9013-4d0b9a7c10b6-5g9sx1.png",
          "https://utfs.io/f/bdc6f9bb-e921-4656-8a8e-afc38c12e9c8-rtzxd2.png",
          "https://utfs.io/f/6ccefc1d-099d-4682-be2d-97a09d5b0446-kte061.png",
        ],
        basePrice: 3200,
        categoryId: computerPeripheralsCategory.id,
        discountPercentage: 0,
      },
      {
        name: "Sony XB23 Extra Bass",
        slug: "sony-xb23-extra-bass",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/0673eb1a-3ef9-4635-89cb-b6379fd3e769-f1tve5.png",
          "https://utfs.io/f/1a18ddf0-7b7d-4a12-ae6a-a46743214477-q9fa1g.png",
          "https://utfs.io/f/566a4f1c-4939-4fd1-91ba-fab5ca198003-3gfmi3.png",
          "https://utfs.io/f/2dacdb7b-ea6a-4232-a78f-5481d6e0f39d-x6aj1m.png",
        ],
        basePrice: 3500,
        categoryId: computerPeripheralsCategory.id,
        discountPercentage: 0,
      },
    ];

    await prisma.product.createMany({
      data: computerPeripherals,
    });

    const smartphonesAndTabletsCategory = await prisma.category.create({
      data: {
        name: "Smartphones e Tablets",
        slug: "smartphones-and-tablets",
        imageUrl:
          "https://utfs.io/f/b2e71c19-c231-4921-81ba-0dc2d8f0d5e5-jz0w7x.png",
      },
    });

    const smartphonesAndTablets = [
      {
        name: "Smartphone Samsung Galaxy A54, 5G, 256GB, 8GB RAM, Octa Core, Câmera Tripla de 50MP, Tela Infinita de 6.4, Preto",
        slug: "smartphone-samsung-galaxy-a54-5g-256gb-8gb-ram-octa-core-camera-tripla-de-50mp-tela-infinita-de-6-4-preto",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/e38940e5-b377-4d18-9761-31c7b66f842d-wkbec1.png",
          "https://utfs.io/f/eec03851-0c16-49d3-aaba-5228e5fe19b6-r3zdg0.png",
          "https://utfs.io/f/b2fa8dad-9746-477a-86c2-ec27353bd8e0-lnncjz.png",
          "https://utfs.io/f/650bf94f-8931-405e-9d15-9a31854e245f-g7bbny.png",
        ],
        basePrice: 2626.3,
        categoryId: smartphonesAndTabletsCategory.id,
        discountPercentage: 15,
      },
      {
        name: 'Smartphone Samsung Galaxy S23 FE, 8GB RAM, 128GB, Octa-Core, Câmera Tripla 50MP, Tela Infinita de 6.4", Grafite',
        slug: "smartphone-samsung-galaxy-s23-fe-8gb-ram-128gb-octa-core-camera-tripla-50mp-tela-infinita-de-6-4-grafite",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/9d5dc801-4e7d-40f4-bfc8-46b591bccf08-oui4n9.png",
          "https://utfs.io/f/ec99a5a2-b8e7-4607-a17a-6c608b7c5364-je63r8.png",
          "https://utfs.io/f/69a6d9e7-8da7-4b0a-84d6-e1760be74a2b-dxu2v7.png",
          "https://utfs.io/f/db3109fe-f71e-4362-9b28-e3b908284111-8hi1z6.png",
        ],
        basePrice: 3998.89,
        categoryId: smartphonesAndTabletsCategory.id,
        discountPercentage: 30,
      },
      {
        name: "Smartphone Samsung Galaxy Z Flip 4, 5G, 128GB, 8GB RAM, Octa Core, Câmera Dupla 12MP, Tela Dobrável de 6.7, Preto",
        slug: "smartphone-samsung-galaxy-z-flip-4-5g-128gb-8gb-ram-octa-core-camera-dupla-12mp-tela-dobravel-de-6-7-preto",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/97accc98-ec11-44ce-aeca-9ca01f506816-d6cf39.png",
          "https://utfs.io/f/3ce0e2d6-085e-4f5e-b5de-238d6d531a8c-pubpuk.png",
          "https://utfs.io/f/29847d5a-d1b6-44a8-8156-9adeb78b2de1-66476r.png",
          "https://utfs.io/f/1e017b02-74dc-4bab-ac71-c311d0389010-wujxr2.png",
        ],
        basePrice: 12000.0,
        categoryId: smartphonesAndTabletsCategory.id,
        discountPercentage: 0,
      },
      {
        name: 'Smartphone Samsung Galaxy S24+, Galaxy AI, Câmera Tripla 50MP, Tela de 6.7" 1-120Hz, 512GB, 12GB de RAM, eSIM, Violeta',
        slug: "smartphone-samsung-galaxy-s24-galaxy-ai-camera-tripla-50mp-tela-de-6-7-1-120hz-512gb-12gb-de-ram-esim-violeta",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/0f3e7d51-23c6-45da-83d5-d06f3fe15111-toz7dm.png",
          "https://utfs.io/f/4f02b2fc-88a9-4f0f-bb3c-8877e59f4afc-z5b89n.png",
          "https://utfs.io/f/65b5e9e3-3e3b-4b4d-80b4-17e7fe74b748-ufgstg.png",
          "https://utfs.io/f/94447c85-d478-440d-98d3-a851a9cb0050-oz4rxf.png",
        ],
        basePrice: 7998.89,
        categoryId: smartphonesAndTabletsCategory.id,
        discountPercentage: 16,
      },
      {
        name: "iPhone 12 Apple 64GB, Câmera Dupla 12MP, Tela 6.1, Branco",
        slug: "iphone-12-apple-64gb-camera-dupla-12mp-tela-6-1-branco",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/d5bb7922-1db0-47e9-b19d-6cdaacdab00f-whb0bc.png",
          "https://utfs.io/f/9c04298a-f5bc-4bec-90ce-1cab02414809-2fp9rd.png",
          "https://utfs.io/f/1367719a-06b1-4cbd-827c-d13ead10d052-xoei52.png",
          "https://utfs.io/f/aa6b3cf0-1604-4a42-b484-a51edb38a399-18lrxn.png",
        ],
        basePrice: 4855.89,
        categoryId: smartphonesAndTabletsCategory.id,
        discountPercentage: 33,
      },
      {
        name: 'iPhone 14 Plus Apple 128GB, Câmera Dupla 12MP, Tela de 6.7", Meia noite',
        slug: "iphone-14-plus-apple-128gb-camera-dupla-12mp-tela-de-6-7-meia-noite",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/308050c1-d6a8-48cf-8798-779a797678b7-6tqhbr.png",
          "https://utfs.io/f/9a297307-ff3e-4836-9906-33250e8cfb77-lauafc.png",
          "https://utfs.io/f/e59d7de9-3c87-4fd0-aead-8d4e6229b99f-llozsp.png",
          "https://utfs.io/f/586f9024-c582-438c-9774-28409dfbf307-6ivrye.png",
        ],
        basePrice: 7601.17,
        categoryId: smartphonesAndTabletsCategory.id,
        discountPercentage: 34,
      },
      {
        name: 'iPhone 13 Apple 128GB, Câmera 12MP, Tela 6.1", Starlight',
        slug: "iphone-13-apple-128gb-camera-12mp-tela-6-1-starlight",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/d161150f-d0c0-4838-b5fe-8f061c71f53c-vsuary.png",
          "https://utfs.io/f/f16656e7-75b0-4e7c-8ba4-f4e7d37272de-m9pwib.png",
          "https://utfs.io/f/3c717de9-653f-4ac2-9608-c0c58825311c-5b61tg.png",
          "https://utfs.io/f/6387e666-6993-4d88-8bfc-7a4791f9a422-bndsvf.png",
        ],
        basePrice: 5578.94,
        categoryId: smartphonesAndTabletsCategory.id,
        discountPercentage: 26,
      },
      {
        name: 'iPhone 13 Apple 128GB, Câmera Dupla 12MP, Tela 6.1", Meia Noite',
        slug: "iphone-13-apple-128gb-camera-dupla-12mp-tela-6-1-meia-noite",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/e8fe1669-ca45-4451-9108-c3183a2207ed-xe4a21.png",
          "https://utfs.io/f/40c2c8a0-3f9d-4fa2-b4df-eaafd8ee13d0-u7undk.png",
          "https://utfs.io/f/7cd203a8-7cb0-4b34-b745-6bb1e96995ab-mspiu1.png",
          "https://utfs.io/f/94725244-62bf-421c-9a28-7bdef63b5142-fdkeai.png",
        ],
        basePrice: 6362.81,
        categoryId: smartphonesAndTabletsCategory.id,
        discountPercentage: 33,
      },
      {
        name: 'Tablet Samsung Galaxy Tab A9+, 64GB, 4GB RAM, Tela Imersiva de 11" 90Hz, Camera Traseira 8MP, WiFi, Android 14, Grafite',
        slug: "tablet-samsung-galaxy-tab-a9-64gb-4gb-ram-tela-imersiva-de-11-90hz-camera-traseira-8mp-wifi-android-14-grafite",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/9c393d63-36b4-48cc-bb7c-f34f109c5a5b-qv7pgy.png",
          "https://utfs.io/f/c10bc337-f5c6-4868-bb1a-19f50540aa6d-bkg9vx.png",
          "https://utfs.io/f/5efd4a2d-8159-45a2-9d71-bdba67772d4c-l0zsqc.png",
          "https://utfs.io/f/9cf37145-7516-45f6-b26d-226748616682-heo6mj.png",
        ],
        basePrice: 1555.45,
        categoryId: smartphonesAndTabletsCategory.id,
        discountPercentage: 17,
      },
      {
        name: 'Tablet Samsung Galaxy Tab S9 FE, 128GB, Wi-Fi, Tela de 10.9" Android 14, 6GB RAM, Camera Traseira de 8MP',
        slug: "tablet-samsung-galaxy-tab-s9-fe-128gb-wi-fi-tela-de-10-9-android-14-6gb-ram-camera-traseira-de-8mp",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/8116101f-67a1-4ac3-96cf-45190ec34d4a-c6ygsy.png",
          "https://utfs.io/f/ab7a3841-08d6-4b8e-860c-2075e4639334-87quup.png",
          "https://utfs.io/f/20b21247-83a1-40b6-b6c3-9d68d08c1edc-48j8wg.png",
          "https://utfs.io/f/0ffa7a41-dcb9-4980-8bec-c96e88623676-9bmy7.png",
        ],
        basePrice: 2666.66,
        categoryId: smartphonesAndTabletsCategory.id,
        discountPercentage: 0,
      },
      {
        name: 'Tablet Samsung Galaxy Tab S9 FE+, 128GB, Wi-Fi, Tela de 12.4", Android 14, 8GB RAM, Camera Traseira Dupla de 8MP + 8MP UW',
        slug: "tablet-samsung-galaxy-tab-s9-fe-128gb-wi-fi-tela-de-12-4-android-14-8gb-ram-camera-traseira-dupla-de-8mp-8mp-uw",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id malesuada elit, eget vulputate justo. Sed sollicitudin velit dolor, ut gravida odio iaculis a.\nNulla risus justo, tempor eu felis eu, efficitur pulvinar risus. Sed viverra, nisi id egestas convallis, massa lorem convallis magna, vel convallis mi turpis nec ante. Maecenas posuere lacus id gravida dignissim. Morbi sit amet rutrum ex. Duis sit amet sem orci. Morbi non nisl sed mauris mattis ullamcorper quis eget metus.\nUt pellentesque ornare erat, vitae blandit ex pulvinar sit amet. Ut pellentesque lorem at eros vestibulum lobortis. Proin bibendum est facilisis nulla tristique vestibulum. Etiam placerat tortor sit amet lacinia volutpat. Curabitur lectus turpis, faucibus vitae tortor in, lacinia tristique neque.",
        imageUrls: [
          "https://utfs.io/f/4819e332-09ca-4b1f-9608-229dc4241790-1mvbw4.png",
          "https://utfs.io/f/6aaf472f-909a-4b6f-bde2-bf5d180d779e-5lwqej.png",
          "https://utfs.io/f/2fe55123-d857-483f-9c1b-ad55cae58788-cuosp6.png",
          "https://utfs.io/f/dc3c74f9-f729-46af-8ab7-d3181f66cadd-k3guzt.png",
        ],
        basePrice: 3500.0,
        categoryId: smartphonesAndTabletsCategory.id,
        discountPercentage: 0,
      },
    ];

    await prisma.product.createMany({
      data: smartphonesAndTablets,
    });

    console.log("Seed completed successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
