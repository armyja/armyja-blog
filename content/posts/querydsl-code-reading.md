---
title: "QueryDSL源码阅读"
date: 2024-04-04T22:32:00+08:00
lastmod: 2024-04-05
draft: false
author: "Armyja"
tags: ["QueryDSL"]
categories: ["Code Reading"]
showTableOfContents: true
keywords: []
description: "QueryDSL是一个强大的框架,它使Java开发人员能够以类型安全的方式构建SQL查询。"
---
## 导语

[QueryDSL](https://github.com/querydsl/querydsl)是一个强大的框架,它使Java开发人员能够以类型安全的方式构建SQL查询。以下是我喜欢QueryDSL的一些原因：

- QueryDSL让我们摆脱了编写原始SQL字符串的麻烦,这种做法容易出错且难以维护。相反,QueryDSL提供了一个优雅的API,让我们可以像在Java代码中一样构建查询。这不仅提高了代码的可读性,还消除了SQL注入的风险。

- QueryDSL支持多种持久层框架,如JPA、SQL、MongoDB和Lucene等。无论使用何种持久层技术,QueryDSL都能提供统一的查询API,这极大地简化了跨框架的代码移植。

- QueryDSL查询是完全类型安全的,编译器会检查错误,避免了许多运行时错误。这使得重构变得更加容易和安全。

- QueryDSL查询也更易于维护。相比晦涩的SQL字符串,QueryDSL查询的代码结构更清晰,注释也更易于编写和理解。

总之,QueryDSL让我们能够以一种现代、类型安全和面向对象的方式来构建查询,极大地提高了生产力和代码质量。它是Java持久层编程中非常有价值的工具。

关于QueryDSL的使用示例，可以参考 Jay Kim 的[文章](https://jskim1991.medium.com/spring-boot-exploring-spring-boot-3-with-querydsl-part-2-7b563c382192) 和[代码仓库](https://github.com/jskim1991/spring-boot-querydsl-sample)。

## 模块分析

从 `querydsl-core` 开始看起，关注 `DSL expression types`。`com.querydsl.core.types.dsl` 包含了Querydsl核心类型的定义和实现。Querydsl是一个用于构建类型安全的SQL查询的框架,这些类型定义了Querydsl查询中使用的各种表达式和操作的接口和实现。

一些主要的类型包括：

- Expression: 定义了通用的类型化表达式接口。

- Constant: 表示常量表达式。

- Operation: 表示常见的操作和函数调用。

- Path: 表示变量、属性和集合成员访问。

- FactoryExpression: 用于基于行的结果处理。

这些接口和类为Querydsl提供了构建查询的基础抽象和实现。通过这些类型,Querydsl能够以类型安全的方式构造复杂的查询,并将其翻译为不同的查询语言(如SQL、MongoDB查询等)。

总的来说,这个目录定义了Querydsl查询构造的核心模型,是整个Querydsl框架的基础。

### `ToStringVisitor.java` 代码片段

对于 `FactoryExpression` 类型,构造一个新对象的字符串表示,包括类名和参数列表。
```java
@Override
public String visit(FactoryExpression<?> e， Templates templates) {
  final StringBuilder builder = new StringBuilder();
  builder.append("new ").append(e.getType().getSimpleName()).append("(");
  boolean first = true;
  for (Expression<?> arg : e.getArgs()) {
    if (!first) {
      builder.append(", ");
    }
    builder.append(arg.accept(this, templates));
    first = false;
  }
  builder.append(")");
  return builder.toString();
}
```

对于 `Operation` 类型,根据操作符查找对应的模板,并按模板的元素顺序拼接字符串,处理操作数的优先级。
```java
@Override
public String visit(Operation<?> o, Templates templates) {
  final Template template = templates.getTemplate(o.getOperator());
  if (template != null) {
    final int precedence = templates.getPrecedence(o.getOperator());
    final StringBuilder builder = new StringBuilder();
    for (Template.Element element : template.getElements()) {
      final Object rv = element.convert(o.getArgs());
      if (rv instanceof Expression) {
        if (precedence > -1 && rv instanceof Operation) {
          if (precedence < templates.getPrecedence(((Operation<?>) rv).getOperator())) {
            builder.append("(");
            builder.append(((Expression<?>) rv).accept(this, templates));
            builder.append(")");
            continue;
          }
        }
        builder.append(((Expression<?>) rv).accept(this, templates));
      } else {
        builder.append(rv.toString());
      }
    }
    return builder.toString();
  } else {
    return "unknown operation with operator " + o.getOperator().name() + " and args " + o.getArgs();
  }
}
```

### Constant
Constant接口代表一个通用的常量表达式。它继承自 Expression 接口,并定义了一个 getConstant() 方法来获取包装的常量值。

与之相关的主要类有:

`ConstantImpl`  
这是 Constant 接口的实现类,它包装了实际的常量值。在 ConstantImpl 中,有一个泛型字段 constant 用于存储常量值。

`Expressions`  
这是一个工具类,提供了创建常量表达式的静态方法 constant(T value)。它内部调用了 ConstantImpl.create(value) 来构造常量表达式。

一些测试用的常量类  
在测试代码中,有一些继承自 `ConstantImpl` 的常量类,如 `TimeConstant`、`DateConstant`、`StringConstant`、`NumberConstant` 等,用于测试不同类型的常量表达式。

总的来说,`Constant` 接口定义了常量表达式的契约,`ConstantImpl` 是其实现,而 `Expressions` 工具类提供了创建常量表达式的便捷方法。在查询DSL中,常量表达式可以用于构建查询条件、投影等。

### Path
Path接口代表一个路径表达式。路径表达式指的是对变量、属性和集合成员的访问。它继承自 Expression 接口。

Path 接口定义了以下几个主要方法:

- getMetadata()：获取该路径的元数据。
- getRoot()：获取该路径的根路径。
- getAnnotatedElement()：获取与该路径相关的注解元素。

与 Path 接口相关的主要类有:

- PathMetadata：封装了路径的元数据信息,如路径类型、父路径等。
- PathImpl：Path 接口的默认实现类。
- 一些具体的路径类,如 SimplePath、BeanPath、CollectionPath、MapPath 等,分别代表不同类型的路径。  
这些具体的路径类通常作为查询的起点,例如:  
  ```java
  QEmployee employee = QEmployee.employee;
  employee.firstName // 代表 employee 对象的 firstName 属性路径
  ```

在查询DSL中,路径表达式用于构建查询条件、投影等。通过路径表达式,可以方便地访问对象的属性、集合元素等。Path 接口定义了路径表达式的基本契约,而具体的路径类型由不同的实现类来表示。
