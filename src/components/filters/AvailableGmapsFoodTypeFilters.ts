import { GmapsFoodTypeFilter } from "./FiltersContext";

const availableFoodTypeFilters: GmapsFoodTypeFilter[] = [
    {
        id: "3be7c561-ba9f-435a-b14d-5f4c8e446970",
        gmapsLocationTypes: ["acai_shop"],
        displayName: "Acai",
    },
    {
        id: "0fa74cd9-b54e-47dd-9a87-0744869f93c8",
        gmapsLocationTypes: ["afghani_restaurant"],
        displayName: "Afghani",
    },
    {
        id: "0f9a93f0-9b15-420d-8797-007655e15beb",
        gmapsLocationTypes: ["african_restaurant"],
        displayName: "African",
    },
    {
        id: "a738b41f-4ef8-435c-8cf7-259a327833a9",
        gmapsLocationTypes: ["american_restaurant"],
        displayName: "American",
    },
    {
        id: "a6f8ce36-f798-48a9-be65-d66c13d50eff",
        gmapsLocationTypes: ["asian_restaurant"],
        displayName: "Asian",
    },
    {
        id: "7309f0f9-ce77-40a2-9f74-f9ba4844b45d",
        gmapsLocationTypes: ["bagel_shop"],
        displayName: "Bagels",
    },
    {
        id: "8c3c636f-1a6c-40eb-a1ab-e5356b1ee715",
        gmapsLocationTypes: ["bakery"],
        displayName: "Bakery",
    },
    {
        id: "06f27d52-3cd0-451c-8012-ae290d688e70",
        gmapsLocationTypes: ["bar", "bar_and_grill", "pub"],
        displayName: "Bar",
    },
    {
        id: "cba827a9-2f4f-4633-8db2-1cfd27861183",
        gmapsLocationTypes: ["barbecue_restaurant"],
        displayName: "Barbecue",
    },
    {
        id: "a6b9bfdb-2e11-4b76-8bbb-9ebe7aadfa21",
        gmapsLocationTypes: ["brazilian_restaurant"],
        displayName: "Brazilian",
    },
    {
        id: "0cdb9fe9-c1ad-4dca-bd4a-b6c1410dfbec",
        gmapsLocationTypes: ["breakfast_restaurant"],
        displayName: "Breakfast",
    },
    {
        id: "127a76a7-04f4-4d17-ae61-34c2158c767a",
        gmapsLocationTypes: ["brunch_restaurant"],
        displayName: "Brunch",
    },
    {
        id: "2ea6a0a8-9897-4cb9-ad57-c5db3728f030",
        gmapsLocationTypes: ["buffet_restaurant"],
        displayName: "Buffet",
    },
    {
        id: "f0c53707-82e0-4069-be1f-b2dbc802abda",
        gmapsLocationTypes: ["cafe", "coffee_shop"],
        displayName: "Cafe/Coffee Shop",
    },
    {
        id: "d7bd27b2-e8c8-464f-81b3-902e36a390a7",
        gmapsLocationTypes: ["cafeteria"],
        displayName: "Cafeteria",
    },
    {
        id: "83d07870-359e-4e23-953e-bc0d1d2817b3",
        gmapsLocationTypes: [
            "candy_store",
            "confectionery",
            "dessert_restaurant",
            "dessert_shop",
        ],
        displayName: "Candy Shop",
    },
    {
        id: "3d715a72-7383-4540-b246-1b7cc9db260e",
        gmapsLocationTypes: ["cat_cafe"],
        displayName: "Cat Cafe",
    },
    {
        id: "b7abb30d-5bb7-4653-bf10-ea03666a4bf5",
        gmapsLocationTypes: ["chinese_restaurant"],
        displayName: "Chinese",
    },
    {
        id: "1268b6b2-d7f3-471b-8078-91e74161563c",
        gmapsLocationTypes: ["chocolate_shop", "chocolate_factory"],
        displayName: "Chocolate Shop",
    },
    {
        id: "a01b5392-a32e-47bd-91aa-4dd2ad58cb3f",
        gmapsLocationTypes: ["deli"],
        displayName: "Deli",
    },
    {
        id: "02b863aa-03c4-473f-8044-61f468102a6f",
        gmapsLocationTypes: ["diner"],
        displayName: "Diner",
    },
    {
        id: "cfa51787-90cc-44f2-9fcc-38469d068c79",
        gmapsLocationTypes: ["dog_cafe"],
        displayName: "Dog Cafe",
    },
    {
        id: "0c6d80a8-200b-4e0c-8026-be89bcfa3c91",
        gmapsLocationTypes: ["donut_shop"],
        displayName: "Donuts",
    },
    {
        id: "3d93980d-973a-474b-bd3c-3deaa628c821",
        gmapsLocationTypes: ["fast_food_restaurant"],
        displayName: "Fast Food",
    },
    {
        id: "706322cd-fcab-4d35-b7eb-9961714d530b",
        gmapsLocationTypes: ["fine_dining_restaurant"],
        displayName: "Fine Dining",
    },
    {
        id: "9db08352-3be5-461d-96e5-0214a440c43e",
        gmapsLocationTypes: ["food_court"],
        displayName: "Food Court",
    },
    {
        id: "3a8019dc-1701-4fe0-b1ac-fb07784c121d",
        gmapsLocationTypes: ["french_restaurant"],
        displayName: "French Restaurant",
    },
    {
        id: "0fb20fc3-08e1-4537-834b-5dcc34bb0914",
        gmapsLocationTypes: ["greek_restaurant"],
        displayName: "Greek Restaurant",
    },
    {
        id: "7cb8f53e-98ec-483e-bd25-facedcb6d0a4",
        gmapsLocationTypes: ["hamburger_restaurant"],
        displayName: "Hamburgers",
    },
    {
        id: "a9b0b0f6-048e-48dd-949a-a2f91f0b4fae",
        gmapsLocationTypes: ["ice_cream_shop"],
        displayName: "Ice Cream",
    },
    {
        id: "05e8fb80-bb76-4ce7-9406-83a7e09fc40b",
        gmapsLocationTypes: ["indian_restaurant"],
        displayName: "Indian",
    },
    {
        id: "807362ac-da2e-42f9-911b-d226234a1f58",
        gmapsLocationTypes: ["indonesian_restaurant"],
        displayName: "Indonesian",
    },
    {
        id: "d4550ac0-b3b8-4b27-a371-9f1812042845",
        gmapsLocationTypes: ["italian_restaurant"],
        displayName: "Italian",
    },
    {
        id: "48337470-2cc2-4d03-ba6f-a64f458a8ed5",
        gmapsLocationTypes: ["japanese_restaurant"],
        displayName: "Japanese",
    },
    {
        id: "22db8778-bcf0-4724-bd04-775caa223bed",
        gmapsLocationTypes: ["juice_shop"],
        displayName: "Juice",
    },
    {
        id: "ae41af93-7a6a-4892-a1b7-dda49799630a",
        gmapsLocationTypes: ["korean_restaurant"],
        displayName: "Korean",
    },
    {
        id: "770d467b-893c-48af-9386-b762a7e4d536",
        gmapsLocationTypes: ["lebanese_restaurant"],
        displayName: "Lebanese",
    },
    {
        id: "da858a54-4d51-4ca7-81fd-456f3d1197ae",
        gmapsLocationTypes: ["mediterranean_restaurant"],
        displayName: "Mediterranean",
    },
    {
        id: "ad7fd941-4521-40fa-a8f7-55f5d9367fb0",
        gmapsLocationTypes: ["mexican_restaurant"],
        displayName: "Mexican",
    },
    {
        id: "9e7c20fc-007e-4e60-9639-f634f4f37d22",
        gmapsLocationTypes: ["middle_eastern_restaurant"],
        displayName: "Middle Eastern",
    },
    {
        id: "c17a1ab2-985a-4e44-beb1-7f8de6bc3e3e",
        gmapsLocationTypes: ["pizza_restaurant"],
        displayName: "Pizza",
    },
    {
        id: "9216d4bf-e2f9-4fe9-b8a0-f5340cffeb67",
        gmapsLocationTypes: ["bar", "bar_and_grill", "pub"],
        displayName: "Pub",
    },
    {
        id: "4bb43119-e244-4447-ba23-749f843605ad",
        gmapsLocationTypes: ["ramen_restaurant"],
        displayName: "Ramen",
    },
    {
        id: "6645a363-2b05-4857-ba79-6244ac743885",
        gmapsLocationTypes: ["sandwich_shop"],
        displayName: "Sandwiches",
    },
    {
        id: "4da4ba53-d464-41fa-b396-add25e469682",
        gmapsLocationTypes: ["seafood_restaurant"],
        displayName: "Seafood",
    },
    {
        id: "e686338e-df32-4fa6-b29d-359881c0f3e0",
        gmapsLocationTypes: ["spanish_restaurant"],
        displayName: "Spanish",
    },
    {
        id: "d3cb3b68-c331-4d00-bf03-a4703d9ee230",
        gmapsLocationTypes: ["steak_house"],
        displayName: "Steak",
    },
    {
        id: "9dcf089f-c245-4d0a-b7cb-5f09679717d4",
        gmapsLocationTypes: ["sushi_restaurant"],
        displayName: "Sushi",
    },
    {
        id: "b74d29b8-24bf-4f37-b0ed-3c21f39c6781",
        gmapsLocationTypes: ["tea_house"],
        displayName: "Tea House",
    },
    {
        id: "4b5b8195-4fe5-43cc-9261-9583e8f51e2f",
        gmapsLocationTypes: ["thai_restaurant"],
        displayName: "Thai",
    },
    {
        id: "9099fa60-8180-4964-a095-f6f6e089b486",
        gmapsLocationTypes: ["turkish_restaurant"],
        displayName: "Turkish",
    },
    {
        id: "543d0002-b8bd-4930-9f0a-1fc4b3d9bd7d",
        gmapsLocationTypes: ["vegan_restaurant"],
        displayName: "Vegan",
    },
    {
        id: "d3397f2c-24f4-4159-b97e-c9099012622d",
        gmapsLocationTypes: ["vegetarian_restaurant"],
        displayName: "Vegetarian",
    },
    {
        id: "42ec8103-6e0f-4444-ae20-75dd582025a8",
        gmapsLocationTypes: ["vietnamese_restaurant"],
        displayName: "Vietnamese",
    },
    {
        id: "dbc6807a-7ac4-4885-802f-517f4f6be1b9",
        gmapsLocationTypes: ["wine_bar "],
        displayName: "Wine Bar",
    },
];

export default availableFoodTypeFilters;
