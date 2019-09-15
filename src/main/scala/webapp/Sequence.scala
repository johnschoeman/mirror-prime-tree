package webapp

import scala.scalajs.js.annotation._

object Main extends App {
}


@JSExportTopLevel("Sequence")
object Sequence {
  @JSExport
  def sayHello(): Unit = {
    println("HELLO WORLD")
  }

  @JSExport
  def generateRecaman(n: Int, root: Int, count: Int): Json = {
    val list = recaman(n, root, Set()).take(count).toList
    // Json.toJson(list)
    list
  }

  @JSExport
  def recaman(n: Int, lastTerm: Int, visited: Set[Int]): Stream[Int] = {
    val minusTerm: Int = lastTerm - n
    if (minusTerm >= 0 && !visited.contains(minusTerm)) {
      minusTerm #:: recaman(n + 1, minusTerm, visited.+(minusTerm))
    } else {
      val plusTerm: Int = lastTerm + n
      plusTerm #:: recaman(n + 1, plusTerm, visited + plusTerm)
    }
  }

  // println(recaman(0, 0, Set()).take(60).toList)
  // println(recaman(0, 1, Set()).take(20).toList)
  // println(recaman(0, 2, Set()).take(20).toList)
  // println(recaman(0, 3, Set()).take(20).toList)
  println(generateRecaman(0,0,40))
}