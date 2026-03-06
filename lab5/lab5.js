'use strict';

function normalizeString(value) {
  if (value == null) return '';
  return String(value).trim();
}

function isValidPhone(value) {
  const s = normalizeString(value);
  if (!s) return false;
  const phonePattern = /^(?:\(\d{3}\)\d{3}-\d{4}|\(\d{3}\)\s\d{3}-\d{4}|\d{3}\/\d{3}-\d{4}|\d{3}-\d{3}-\d{4}|\d{3}\.\d{3}\.\d{4}|\d{3}\s\d{3}\s\d{4}|\d{10})$/;
  return phonePattern.test(s);
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomOperator() {
  const ops = ['+', '-', '*', '/'];
  return ops[randInt(0, ops.length - 1)];
}

function randomOperand() {
  return randInt(1, 20);
}

function generateExpression() {
  const a = randomOperand();
  const op1 = randomOperator();
  const b = op1 === '/' ? randInt(1, 20) : randomOperand();

  const includeThird = Math.random() < 0.5;
  if (!includeThird) {
    return `${a} ${op1} ${b}`;
  }

  const op2 = randomOperator();
  const c = op2 === '/' ? randInt(1, 20) : randomOperand();
  return `${a} ${op1} ${b} ${op2} ${c}`;
}

function nearlyEqual(a, b, epsilon = 1e-9) {
  return Math.abs(a - b) <= epsilon;
}

function setResult(el, text, ok) {
  el.textContent = text;
  el.classList.remove('ok', 'bad', 'muted');
  el.classList.add(ok ? 'ok' : 'bad');
}

function setMuted(el, text) {
  el.textContent = text;
  el.classList.remove('ok', 'bad');
  el.classList.add('muted');
}

function runPhoneTest() {
  const input = document.getElementById('phoneInput');
  const result = document.getElementById('phoneResult');
  const value = input ? input.value : '';
  const ok = isValidPhone(value);
  setResult(result, ok ? 'Numéro valide.' : 'Numéro invalide.', ok);
}

function runQuiz() {
  const expr = generateExpression();
  const exprView = document.getElementById('exprView');
  const result = document.getElementById('quizResult');

  exprView.textContent = `Expression courante: ${expr}`;

  const answer = window.prompt(`Entrez la valeur de l'expression ${expr} : `, '');
  if (answer === null) {
    setMuted(result, 'Quiz annulé.');
    return;
  }

  const userValue = Number.parseFloat(normalizeString(answer));
  if (Number.isNaN(userValue)) {
    setResult(result, 'Entrée invalide: veuillez entrer un nombre.', false);
    return;
  }

  const expected = eval(expr);
  const ok = nearlyEqual(userValue, expected);
  if (ok) {
    setResult(result, `Correct. Résultat: ${expected}`, true);
  } else {
    setResult(result, `Faux. Résultat attendu: ${expected}`, false);
  }
}

class CircularQueue {
  constructor(capacity) {
    if (!Number.isInteger(capacity) || capacity <= 0) {
      throw new Error('Capacity must be a positive integer.');
    }
    this.capacity = capacity;
    this.data = new Array(capacity);
    this.front = 0;
    this.rear = 0;
    this.length = 0;
  }

  enqueue(value) {
    if (this.isFull()) return false;
    this.data[this.rear] = value;
    this.rear = (this.rear + 1) % this.capacity;
    this.length += 1;
    return true;
  }

  dequeue() {
    if (this.isEmpty()) return null;
    const value = this.data[this.front];
    this.data[this.front] = undefined;
    this.front = (this.front + 1) % this.capacity;
    this.length -= 1;
    return value;
  }

  peek() {
    if (this.isEmpty()) return null;
    return this.data[this.front];
  }

  isEmpty() {
    return this.length === 0;
  }

  isFull() {
    return this.length === this.capacity;
  }

  size() {
    return this.length;
  }

  toArray() {
    const out = [];
    for (let i = 0; i < this.length; i += 1) {
      out.push(this.data[(this.front + i) % this.capacity]);
    }
    return out;
  }
}

function demoQueue() {
  const q = new CircularQueue(5);
  const lines = [];

  lines.push(`Initial: size=${q.size()} empty=${q.isEmpty()} full=${q.isFull()} content=[${q.toArray().join(', ')}]`);
  lines.push(`enqueue(10): ${q.enqueue(10)}`);
  lines.push(`enqueue(20): ${q.enqueue(20)}`);
  lines.push(`enqueue(30): ${q.enqueue(30)}`);
  lines.push(`dequeue(): ${q.dequeue()}`);
  lines.push(`enqueue(40): ${q.enqueue(40)}`);
  lines.push(`enqueue(50): ${q.enqueue(50)}`);
  lines.push(`enqueue(60): ${q.enqueue(60)}`);
  lines.push(`isFull(): ${q.isFull()}`);
  lines.push(`peek(): ${q.peek()}`);
  lines.push(`Final: size=${q.size()} content=[${q.toArray().join(', ')}]`);

  return lines.join('\n');
}

function runQueueDemo() {
  const out = document.getElementById('queueResult');
  out.textContent = demoQueue();
}

function init() {
  document.getElementById('phoneBtn').addEventListener('click', runPhoneTest);
  document.getElementById('quizBtn').addEventListener('click', runQuiz);
  document.getElementById('queueBtn').addEventListener('click', runQueueDemo);
}

document.addEventListener('DOMContentLoaded', init);
