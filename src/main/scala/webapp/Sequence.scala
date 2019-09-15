package webapp

import scala.scalajs.js.annotation._
import io.circe._, io.circe.generic.auto._, io.circe.parser._, io.circe.syntax._, io.circe.Encoder

object Main extends App {
  Sequence.generateRecaman(0,0,10)
}

@JSExportTopLevel("Sequence")
object Sequence {
  @JSExport
  def sayHello(): Unit = {
    println("HELLO WORLD")
  }

  @JSExport
  def generateRecaman(n: Int, root: Int, count: Int) = {
    val list = recaman(n, root, Set()).take(count).toList
    list.asJson.noSpaces
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
}
