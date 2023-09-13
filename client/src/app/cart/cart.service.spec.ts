import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { product } from '../products/Product';
import { PromotionsService } from '../promotions/promotions.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartService,
        { provide: PromotionsService, useValue: { promotions: [] } }
      ]
    });
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addProduct', () => {
    it('should correctly add a new product to the cart', () => {
        let product: product = {
          id: 'abc123',
          name: 'Product 1',
          price: 1.99
        };
  
        service.addProduct(product);
  
        expect(service.cart.products.length).toBe(1);
        expect(service.cart.products[0]).toEqual({id: 'abc123', name: 'Product 1', price: 1.99, quantity: 1, grossPrice: 1.99, netPrice: 1.99, promotion: null});
        expect(service.cart.grossPrice).toBe(1.99);
        expect(service.cart.totalQuantity).toBe(1);
    });
  
    it("should correctly increment an existing product's quantity", () => {
      let product: product = {
        id: 'abc123',
        name: 'Product 1',
        price: 1.99
      };

      service.addProduct(product);
      service.addProduct(product);

      expect(service.cart.products.length).toBe(1);
      expect(service.cart.products[0]).toEqual({id: 'abc123', name: 'Product 1', price: 1.99, quantity: 2, grossPrice: 3.98, netPrice: 3.98, promotion: null});
      expect(service.cart.grossPrice).toBe(3.98);
      expect(service.cart.totalQuantity).toBe(2);
    });
  
    it("should correctly add a new product alongside an existing product", () => {
      let product1: product = {
        id: 'abc123',
        name: 'Product 1',
        price: 1.99
      };

      let product2: product = {
        id: 'xyz789',
        name: 'Product 2',
        price: 1.49
      };

      service.addProduct(product1);
      service.addProduct(product2);

      expect(service.cart.products.length).toBe(2);
      expect(service.cart.products[0]).toEqual({id: 'abc123', name: 'Product 1', price: 1.99, quantity: 1, grossPrice: 1.99, netPrice: 1.99, promotion: null});
      expect(service.cart.products[1]).toEqual({id: 'xyz789', name: 'Product 2', price: 1.49, quantity: 1, grossPrice: 1.49, netPrice: 1.49, promotion: null});
      expect(service.cart.grossPrice).toBe(3.48);
      expect(service.cart.totalQuantity).toBe(2);
    });
  })

  describe('decrementProductQuantity', () => {
    it('should correctly decrement the required product quantity', () => {
      let product: product = {
        id: 'abc123',
        name: 'Product 1',
        price: 1.99
      };

      service.addProduct(product);
      service.incrementProductQuantity(product.id);

      service.decrementProductQuantity(product.id);

      expect(service.cart.products.length).toBe(1);
      expect(service.cart.products[0]).toEqual({id: 'abc123', name: 'Product 1', price: 1.99, quantity: 1, grossPrice: 1.99, netPrice: 1.99, promotion: null});
    })

    it('should not allow a product quantity to drop below 1', () => {
      let product: product = {
        id: 'abc123',
        name: 'Product 1',
        price: 1.99
      };

      service.addProduct(product);

      service.decrementProductQuantity(product.id);

      expect(service.cart.products.length).toBe(1);
      expect(service.cart.products[0]).toEqual({id: 'abc123', name: 'Product 1', price: 1.99, quantity: 1, grossPrice: 1.99, netPrice: 1.99, promotion: null});
    })

    it('should not decrement a quantity for a product other than the requested', () => {
      let product1: product = {
        id: 'abc123',
        name: 'Product 1',
        price: 1.99
      };

      let product2: product = {
        id: 'xyz789',
        name: 'Product 2',
        price: 1.49
      };

      service.addProduct(product1);
      service.incrementProductQuantity(product1.id);
      service.addProduct(product2);
      service.incrementProductQuantity(product2.id);

      service.decrementProductQuantity(product2.id);

      expect(service.cart.products.length).toBe(2);
      expect(service.cart.products[0]).toEqual({id: 'abc123', name: 'Product 1', price: 1.99, quantity: 2, grossPrice: 3.98, netPrice: 3.98, promotion: null});
      expect(service.cart.products[1]).toEqual({id: 'xyz789', name: 'Product 2', price: 1.49, quantity: 1, grossPrice: 1.49, netPrice: 1.49, promotion: null});
    })

    it('should correctly adjust total quantity', () => {
      let product: product = {
        id: 'abc123',
        name: 'Product 1',
        price: 1.99
      };

      service.addProduct(product);
      service.incrementProductQuantity(product.id);
      service.incrementProductQuantity(product.id);

      service.decrementProductQuantity(product.id);

      expect(service.cart.totalQuantity).toBe(2);
    })

    it('should correctly adjust total price', () => {
      let product: product = {
        id: 'abc123',
        name: 'Product 1',
        price: 1.99
      };

      service.addProduct(product);
      service.incrementProductQuantity(product.id);
      service.incrementProductQuantity(product.id);

      service.decrementProductQuantity(product.id);

      expect(Math.round(service.cart.grossPrice * 100) / 100).toBe(3.98);
    })
  })

  describe('incrementProductQuantity', () => {
    it('should correctly increment the required product quantity', () => {
      let product: product = {
        id: 'abc123',
        name: 'Product 1',
        price: 1.99
      };

      service.addProduct(product);

      service.incrementProductQuantity(product.id);

      expect(service.cart.products.length).toBe(1);
      expect(service.cart.products[0]).toEqual({id: 'abc123', name: 'Product 1', price: 1.99, quantity: 2, grossPrice: 3.98, netPrice: 3.98, promotion: null});
    })

    it('should only increment the requested product quantity', () => {
      let product1: product = {
        id: 'abc123',
        name: 'Product 1',
        price: 1.99
      };

      let product2: product = {
        id: 'xyz789',
        name: 'Product 2',
        price: 1.49
      };

      service.addProduct(product1);
      service.addProduct(product2);

      service.incrementProductQuantity(product2.id);

      expect(service.cart.products.length).toBe(2);
      expect(service.cart.products[0]).toEqual({id: 'abc123', name: 'Product 1', price: 1.99, quantity: 1, grossPrice: 1.99, netPrice: 1.99, promotion: null});
      expect(service.cart.products[1]).toEqual({id: 'xyz789', name: 'Product 2', price: 1.49, quantity: 2, grossPrice: 2.98, netPrice: 2.98, promotion: null});
    })

    it('should correctly update the cart quantity', () => {
      let product: product = {
        id: 'abc123',
        name: 'Product 1',
        price: 1.99
      };

      service.addProduct(product);

      service.incrementProductQuantity(product.id);

      expect(service.cart.products.length).toBe(1);
      expect(service.cart.totalQuantity).toBe(2);
    })

    it('should correctly update the cart price', () => {
      let product: product = {
        id: 'abc123',
        name: 'Product 1',
        price: 1.99
      };

      service.addProduct(product);

      service.incrementProductQuantity(product.id);

      expect(service.cart.products.length).toBe(1);
      expect(service.cart.grossPrice).toBe(3.98);
    })
  })

  describe('removeProduct', () => {
    it('should remove the required product from the cart', () => {
      let product1: product = {
        id: 'abc123',
        name: 'Product 1',
        price: 1.99
      };

      let product2: product = {
        id: 'xyz789',
        name: 'Product 2',
        price: 1.49
      };

      service.addProduct(product1);
      service.addProduct(product2);

      service.removeProduct(service.cart.products[0]);

      expect(service.cart.products[0]).toEqual({id: 'xyz789', name: 'Product 2', price: 1.49, quantity: 1, grossPrice: 1.49, netPrice: 1.49, promotion: null});
    })

    it('should correctly update the cart price', () => {
      let product1: product = {
        id: 'abc123',
        name: 'Product 1',
        price: 1.99
      };

      let product2: product = {
        id: 'xyz789',
        name: 'Product 2',
        price: 1.49
      };

      service.addProduct(product1);
      service.addProduct(product2);

      service.removeProduct(service.cart.products[0]);

      expect(service.cart.grossPrice).toBe(1.49);
    })

    it('should correctly update the cart quantity', () => {
      let product1: product = {
        id: 'abc123',
        name: 'Product 1',
        price: 1.99
      };

      let product2: product = {
        id: 'xyz789',
        name: 'Product 2',
        price: 1.49
      };

      service.addProduct(product1);
      service.addProduct(product2);

      service.removeProduct(service.cart.products[0]);

      expect(service.cart.totalQuantity).toBe(1);
    })
  })

  describe('clearCart', () => {
    it('should clear the cart', () => {
      let product1: product = {
        id: 'abc123',
        name: 'Product 1',
        price: 1.99
      };

      let product2: product = {
        id: 'xyz789',
        name: 'Product 2',
        price: 1.49
      };

      service.addProduct(product1);
      service.addProduct(product2);

      service.clearCart();

      expect(service.cart.products.length).toBe(0);
      expect(service.cart.grossPrice).toBe(0);
      expect(service.cart.totalQuantity).toBe(0);
    })
  })

});
