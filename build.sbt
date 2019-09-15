enablePlugins(ScalaJSPlugin)

name := "Scala.js Tutorial"
scalaVersion := "2.12.8" // or any other Scala version >= 2.10.2

// This is an application with a main method
scalaJSUseMainModuleInitializer := true

libraryDependencies += "org.scala-js" %%% "scalajs-dom" % "0.9.7"
// libraryDependencies += "org.querki" %%% "jquery-facade" % "1.2"

// skip in packageJSDependencies := false
// jsDependencies +=
//   "org.webjars" % "jquery" % "2.2.1" / "jquery.js" minified "jquery.min.js"

// jsEnv := new org.scalajs.jsenv.jsdomnodejs.JSDOMNodeJSEnv()

// libraryDependencies += "com.lihaoyi" %%% "utest" % "0.6.3" % "test"
// testFrameworks += new TestFramework("utest.runner.Framework")

val circeVersion = "0.11.1"

libraryDependencies ++= Seq(
  "io.circe" %%% "circe-core",
  "io.circe" %%% "circe-generic",
  "io.circe" %%% "circe-parser"
).map(_ % circeVersion)
