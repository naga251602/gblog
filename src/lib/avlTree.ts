// src/lib/avlTree.ts

class AVLNode<K, V> {
  key: K;
  values: V[];
  left: AVLNode<K, V> | null = null;
  right: AVLNode<K, V> | null = null;
  height: number = 1;

  constructor(key: K, value: V) {
    this.key = key;
    this.values = [value];
  }
}

export class AVLTree<K extends string | number, V> {
  private root: AVLNode<K, V> | null = null;

  private getHeight(node: AVLNode<K, V> | null): number {
    return node ? node.height : 0;
  }

  private getBalance(node: AVLNode<K, V> | null): number {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  private rotateRight(y: AVLNode<K, V>): AVLNode<K, V> {
    const x = y.left as AVLNode<K, V>;
    const T2 = x.right;
    x.right = y;
    y.left = T2;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    return x;
  }

  private rotateLeft(x: AVLNode<K, V>): AVLNode<K, V> {
    const y = x.right as AVLNode<K, V>;
    const T2 = y.left;
    y.left = x;
    x.right = T2;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    return y;
  }

  public insert(key: K, value: V): void {
    this.root = this.insertNode(this.root, key, value);
  }

  private insertNode(
    node: AVLNode<K, V> | null,
    key: K,
    value: V,
  ): AVLNode<K, V> {
    if (!node) return new AVLNode(key, value);

    if (key < node.key) {
      node.left = this.insertNode(node.left, key, value);
    } else if (key > node.key) {
      node.right = this.insertNode(node.right, key, value);
    } else {
      if (!node.values.includes(value)) node.values.push(value);
      return node;
    }

    node.height =
      1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    const balance = this.getBalance(node);

    if (balance > 1 && node.left) {
      if (key < node.left.key) return this.rotateRight(node);
      node.left = this.rotateLeft(node.left);
      return this.rotateRight(node);
    }
    if (balance < -1 && node.right) {
      if (key > node.right.key) return this.rotateLeft(node);
      node.right = this.rotateRight(node.right);
      return this.rotateLeft(node);
    }

    return node;
  }

  public search(key: K): V[] {
    let current = this.root;
    while (current) {
      if (key === current.key) return current.values;
      if (key < current.key) current = current.left;
      else current = current.right;
    }
    return [];
  }
}
