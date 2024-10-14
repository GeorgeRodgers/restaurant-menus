const {sequelize} = require('./db')
const {Restaurant, Menu} = require('./models/index')
const {
    seedRestaurant,
    seedMenu,
  } = require('./seedData');

let allRestaurants;
let allMenus;

describe('Restaurant and Menu Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
        allRestaurants = await Restaurant.bulkCreate(seedRestaurant);
        allMenus = await Menu.bulkCreate(seedMenu);
        
    });

    test('allRestaurants contains the created restuarants', () => {
        // TODO - write test
        expect(allRestaurants[0]).toEqual(expect.objectContaining(seedRestaurant[0]));
        expect(allRestaurants[1]).toEqual(expect.objectContaining(seedRestaurant[1]));
        expect(allRestaurants[2]).toEqual(expect.objectContaining(seedRestaurant[2]));
    });

    test('can create a Restaurant with the correct id', () => {
        // TODO - write test
        expect(allRestaurants[0]).toHaveProperty('id')
        expect(allRestaurants[0].id).toBe(1)
    });

    test('can create a Restaurant with the correct name', () => {
        // TODO - write test
        expect(allRestaurants[0]).toHaveProperty('name')
        expect(allRestaurants[0].name).toBe('AppleBees')
    });

    test('can create a Restaurant with the correct location', () => {
        // TODO - write test
        expect(allRestaurants[0]).toHaveProperty('location')
        expect(allRestaurants[0].location).toBe('Texas')
    });

    test('can create a Restaurant with the correct cuisine', () => {
        // TODO - write test
        expect(allRestaurants[0]).toHaveProperty('cuisine')
        expect(allRestaurants[0].cuisine).toBe('FastFood')
    });

    test('allMenus contains the created menus', () => {
        // TODO - write test
        expect(allMenus[0]).toEqual(expect.objectContaining(seedMenu[0]));
        expect(allMenus[1]).toEqual(expect.objectContaining(seedMenu[1]));
        expect(allMenus[2]).toEqual(expect.objectContaining(seedMenu[2]));
    });

    test('can create a Menu with the correct id', () => {
        // TODO - write test
        expect(allMenus[1]).toHaveProperty('id')
        expect(allMenus[1].id).toBe(2)
    });

    test('can create a Menu with the correct title', () => {
        // TODO - write test
        expect(allMenus[1]).toHaveProperty('title')
        expect(allMenus[1].title).toBe(`Lunch`)
    });

    test('can update and find Restaurants', async () => {
        // TODO - write test
        updatedRestaurant = await Restaurant.update({name: `testName`, location: `testLocation`, cuisine: `testCuisine`}, {where: {id: 1}});
        foundRestaurant = await Restaurant.findByPk(1);
        expect(foundRestaurant.name).toBe('testName');
        expect(foundRestaurant.location).toBe('testLocation');
        expect(foundRestaurant.cuisine).toBe('testCuisine');
    });
    test('can update and find Menus', async () => {
        // TODO - write test
        updatedMenu = await Menu.update({title: `testTitle`}, {where: {id: 3}});
        foundMenu = await Menu.findByPk(3)
        expect(foundMenu.title).toBe('testTitle');
    });
   
    test('can delete Restaurants', async () => {
        // TODO - write test
        let deletedRestaurant = await foundRestaurant.destroy();
        expect(deletedRestaurant.name).toBe('testName');
        expect(deletedRestaurant.location).toBe('testLocation');
        expect(deletedRestaurant.cuisine).toBe('testCuisine');
    });

    test('can delete Menus', async () => {
        // TODO - write test
        let deletedMenu = await foundMenu.destroy();
        expect(deletedMenu.title).toBe('testTitle');
    });
})