'use strict';

const LinkedList = require('../src/linked-list.js');

describe('singly linked list', () => {
  test('It should have a value and no next', () => {
    let result = new LinkedList(3);
    expect(result.value).toBe(3);
    expect(result.next).toBe(null);
  });

  test('it should append a node to the end of the list', () => {
    let result = new LinkedList(3);
    result.append(new LinkedList(4)).append(new LinkedList(5));

    expect(result.value).toBe(3);
    expect(result.next.value).toBe(4);
    expect(result.next.next.value).toBe(5);
    expect(result.next.next.next).toBe(null);
  });

  test('it should remove a node from the list', () => {
    let result = new LinkedList(3);
    let second = new LinkedList(4);

    result.append(second).append(new LinkedList(5));
    result.remove(second);

    expect(result.value).toBe(3);
    expect(result.next.value).toBe(5);
    expect(result.next.next).toBe(null);
  });

  test('the first element that matches a predicate should be returned', () => {
    let result = new LinkedList(3);
    result.append(new LinkedList(4)).append(new LinkedList(5));

    expect(result.find(node => node.value === 3)).not.toBe(null);
    expect(result.find(node => node.value === 3).value).toBe(3);

    expect(result.find(node => node.value === 5)).not.toBe(null);
    expect(result.find(node => node.value === 5).value).toBe(5);
  });

  test('null should be returned if there are no elements', () => {
    let result = new LinkedList(3);
    result.append(new LinkedList(4)).append(new LinkedList(5));

    expect(result.find(node => node.value === 9)).toBe(null);
  });
});
