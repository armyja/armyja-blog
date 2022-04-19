---
title: Java：简单的四则运算表达式解析
slug: java-simple-math-expression-calculator
date_published: 2016-10-10T02:54:07.000Z
date_updated: 2018-03-09T01:48:09.000Z
author: Jeffey Wang
tags: Java
summary: 四则运算比如：a + b * c + (d - e)，编译器的做法一般是将其解析成逆波兰式之后再进行运算。
---

四则运算比如：a + b \* c + (d - e)

编译器的做法一般是将其解析成[逆波兰式](https://en.wikipedia.org/wiki/Reverse_Polish_notation)之后再进行运算

解析过程如下：

依次取经过四则运算之后的 四则运算表达式 中的各个元素 x

分析规则：（需要使用到 存在逆波兰式结果的栈 结果栈和临时存放运算符的栈 运算符栈）

1 如果 x 为操作数则直接压入结果栈

2 如果 x 为操作符则分析规则如下：

a 如果 x 为 "(", 则直接将其压入运算符栈

b 如果 x 为 ")",则将距离其最近的运算符依次压入结果栈中，并将 "(" 丢弃

c 如果 x 不为"("或者")"：

如果运算符栈为空，则直接将 x 入运算符栈

如果运算符栈非空，若 x 比运算符栈顶运算符的优先级高，则将 x 入栈，否则将运算符栈中优先级高于 x 的运算符依次出栈直到遇到优先级小于 x 的运算符

3 如果到达表达式的末尾，则将运算符栈中的所有运算符依次压入结果栈中

使用栈进行解析。

```java
package Calculator;
import java.util.Stack;
/**
 * Created by jeffrey on 16-9-26.
 */
public class Calculator {
    public static double Cal(String Exp) {
        Stack operator = new Stack(); // 运算符栈
        Stack operand = new Stack(); // 结果临时栈
        int index = 0; // 字符串索引；
        String op = ""; // 存放内容
        // 将 Exp 按照顺序压入栈中
        while (index < Exp.length()) {
            boolean flag = false;
            op += Exp.charAt(index);
            // 运算符或者括号入栈
                switch (op) {
                    case "+":
                    case "-":
                        if (!operator.isEmpty()&&!operator.peek().equals("(") ) {
                            Pop(operand, operator);
                        }
                        operator.push(op);
                        op = "";
                        break;
                    case "*":
                    case "/":
                        if (operator.peek().equals("*")||operator.peek().equals("/")){
                            Pop(operand, operator);
                        }
                        operator.push(op);
                        op = "";
                        break;
                    case "(":
                        operator.push("(");
                        op = "";
                        break;
                    case  ")":
                        while(!operator.peek().equals("("))
                        Pop(operand, operator);
                        operator.pop();
                        op = "";
                        break;
                    default:
                        flag = true;

                }
            if(flag){
                // 最后一个符号
                if (index == Exp.length() - 1) {
                    operand.push(op);
                    while(!operator.isEmpty()){
                        Pop(operand,operator);
                    }
                    op = "";
                }
                // 下一个字符非数字且非小数点，说明 op 是完整的操作数
                else if (!Character.isDigit(Exp.charAt(index + 1)) && Exp.charAt(index + 1) != '.') {
                    operand.push(op);
                    op = "";
                }
            }
            index++;
        }
        // 对没有括号的
        while(!operator.isEmpty()){
            Pop(operand,operator);
        }
        return Double.valueOf(operand.peek().toString());
    }
    private static void Pop(Stack operand, Stack operator) {
        double p2 = Double.valueOf(operand.pop().toString());
        double p1 = Double.valueOf(operand.pop().toString());
        switch (operator.pop().toString()) {
            case "+":
                operand.push(String.valueOf(p1 + p2));
                break;
            case "-":
                operand.push(String.valueOf(p1 - p2));
                break;
            case "/":
                operand.push(String.valueOf(p1 / p2));
                break;
            case "*":
                operand.push(String.valueOf(p1 * p2));
                break;
        }
    }
    public static void main(String[] args){
        double ret = Calculator.Cal("3+0.5*(5*(6+6*9+16))");
        System.out.println(ret);
    }
}
```

参考链接：[https://www.jianshu.com/p/e1147797c11a](https://www.jianshu.com/p/e1147797c11a)
