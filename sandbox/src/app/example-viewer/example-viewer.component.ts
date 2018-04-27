import { Component, Input } from "@angular/core";
import { Example } from "../../dto/Example"

@Component({
  selector: "example-viewer",
  templateUrl: "./example-viewer.component.html",
  styleUrls: [ "./example-viewer.component.css" ]
})

export class ExampleViewerComponent {

  @Input() example : Example;

}

