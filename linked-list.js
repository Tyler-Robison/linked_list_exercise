/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  traverse() {
    if (!this.head) return 'List is empty'
    let currentNode = this.head;
    while (currentNode) {
      console.log(currentNode.val);
      currentNode = currentNode.next
    }
  }

  push(val) {
    const newNode = new Node(val)

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    }

    else {
      this.tail.next = newNode
      this.tail = newNode
    }
    this.length++
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    }

    else {
      const prevHead = this.head
      this.head = newNode;
      this.head.next = prevHead
    }
    this.length++
  }

  /** pop(): return & remove last item. */

  // popped d -> c -> a -> d (d wasn't in this at this point)
  pop() {
    // list contains 0 items
    if (!this.head) throw 'List is empty!'
    let currentNode = this.head;

    // If list contains only 1 item, empty it
    if (!currentNode.next) {
      const prevTail = this.tail
      this.head = null;
      this.tail = null;
      this.length--
      return prevTail.val
    }

    // list contains >= 2 items
    while (currentNode) {
      if (!currentNode.next.next) {
        const prevTail = currentNode.next
        currentNode.next = null
        this.tail = currentNode;
        this.length--
        return prevTail.val
      }
      currentNode = currentNode.next
    }
  }

  /** shift(): return & remove first item. */

  shift() {
    if (!this.head) throw 'List is empty!'
    let currentNode = this.head;

    // If list contains only 1 item, empty it
    if (!currentNode.next) {
      const prevHead = this.head
      this.head = null;
      this.tail = null;
      this.length--
      return prevHead.val
    }

    // list contains >= 2 items
    const prevHead = this.head
    this.head = currentNode.next
    this.length--
    return prevHead.val
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    let nodeCount = 0;
    if (!this.head) throw 'List is empty!'
    let currentNode = this.head;
    while (currentNode) {
      if (idx === nodeCount) return currentNode.val
      nodeCount++
      currentNode = currentNode.next
    }
    return `List does not contain index ${idx}`
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    let nodeCount = 0;
    if (!this.head) throw 'List is empty!'
    let currentNode = this.head;
    while (currentNode) {
      if (idx === nodeCount) {
        const oldVal = currentNode.val
        currentNode.val = val
        return `Value at Index ${idx} has been changed from ${oldVal} to ${currentNode.val}`
      }
      nodeCount++
      currentNode = currentNode.next
    }
    return `List does not contain index ${idx}`
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    let nodeCount = 0;
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.length++
      return
    }
    if (idx === 0) {
      newNode.next = this.head;
      this.head = newNode
    }
    // If inserting after the current head
    let currentNode = this.head;
    while (currentNode) {
      if (nodeCount === idx - 1) {
        const oldNext = currentNode.next
        currentNode.next = newNode;
        newNode.next = oldNext
        this.length++
        if (!newNode.next) this.tail = newNode
        return
      }
      nodeCount++
      currentNode = currentNode.next
    }
    throw 'Invalid idx'
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    let nodeCount = 0;
    if (!this.head) throw 'List is empty!'
    let currentNode = this.head;

    if (idx === 0) {
      this.head = currentNode.next
      if (!currentNode.next) this.tail = currentNode.next
      this.length--
      return
    }

    while (currentNode) {
      const prevNode = currentNode;
      nodeCount++
      currentNode = currentNode.next
      if (nodeCount === idx) {
        prevNode.next = currentNode.next
        this.length--
        if (!currentNode.next) this.tail = prevNode
        return
      }
    }
    throw 'Invalid idx'
  }

  /** average(): return an average of all values in the list */

  average() {
    if (!this.head) return 0
    let currentNode = this.head;
    let total = 0
    while (currentNode) {
      total += currentNode.val
      currentNode = currentNode.next
    }
    return total / this.length
  }
}

const trainArr = ['Engine', 'Cart1', 'Food Cart']
const trainList = new LinkedList(trainArr)
trainList.push('Cart2')
trainList.unshift('cart before engine')

const foodList = new LinkedList()
let lst = new LinkedList([5, 10, 15, 20]);
lst.insertAt(2, 12);
lst.insertAt(5, 25);

foodList.unshift('banana')
foodList.unshift('apple');
foodList.push('celery')
foodList.push('durian')
foodList.traverse()

let newLst = new LinkedList(["a"]);
newLst.removeAt(0);

let lst3 = new LinkedList([2, 3, 1, 1, 7, 6, 9]);
lst3.average()

module.exports = LinkedList;
