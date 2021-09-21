import React, { Component } from "react";
import { Grid, IconButton, Icon, Typography } from "@material-ui/core";
import Layer from "../playground-src/Layer";

export default class Network extends Component {
  constructor() {
    super();
    var inputLayerRef = React.createRef();
    var outputLayerRef = React.createRef();

    this.state = {
      inputLayer: [this.addLayerComp("inputLayer", inputLayerRef)], // so this is a list of layer components
      outputLayer: [this.addLayerComp("outputLayer", outputLayerRef)],
      inputLayerRef: inputLayerRef,
      outputLayerRef: outputLayerRef,

      hidLayers: [],
      hidLayersCount: 0,
      hidLayersRefs: [],

      edges: [],
      edgesRendered: false,

      nodeStates: [],
      maxHiddenLayersThreshold: 5,
      minHiddenLayersThreshold: 0,
    };
  }

  calculateNodePositionByName(name) {
    const { x, y } = document.getElementById(name).getBoundingClientRect();

    const nodeStateObject = {
      x,
      y,
      name,
    };
    return nodeStateObject;
  }

  addLayerComp(name, ref) {
    return <Layer name={name} ref={ref}></Layer>;
  }

  addLayer() {
    var stateObject = {};
    stateObject["hidLayersCount"] = Math.min(this.state.maxHiddenLayersThreshold + 1, this.state.hidLayersCount + 1);

    if (stateObject["hidLayersCount"] < (this.state.maxHiddenLayersThreshold + 1)) {
      var hidLayers = this.state.hidLayers;
      var hidLayersRefs = this.state.hidLayersRefs;

      var newLayerName = "hidLayer_" + stateObject["hidLayersCount"];
      var newLayerRef = React.createRef();

      hidLayers.push(this.addLayerComp(newLayerName, newLayerRef));
      hidLayersRefs.push(newLayerRef);

      stateObject["hidLayersRefs"] = hidLayersRefs;
      stateObject["hidLayers"] = hidLayers;

      this.setState(stateObject);
    }
  }

  removeLayer() {
    var stateObject = {};
    if (this.state.hidLayersCount > this.state.minHiddenLayersThreshold) {
      stateObject["hidLayersCount"] = this.state.hidLayersCount - 1;
      var hidLayers = this.state.hidLayers;
      var hidLayersRefs = this.state.hidLayersRefs;
      hidLayersRefs.pop();
      hidLayers.pop();
      stateObject["hidLayers"] = hidLayers;
      stateObject["hidLayersRefs"] = hidLayersRefs;
    }
  }

  render() {
    console.log(this.state.nodeStates);
    return (
      <div>
        <Grid // Layer addition/removal buttons grid
          container
          style={{
            //backgroundColor: "#ee3eee",
            height: "6vh",
            width: "100vw",
          }}
          justify="center"
          alignItems="center"
        >
          <Grid item spacing={1}>
            <IconButton onClick={() => this.addLayer()}>
              <Icon
                style={{
                  color: "#546e7a",
                }}
              >
                add_circle
              </Icon>
            </IconButton>
          </Grid>
          <Grid item spacing={1}>
            <IconButton onClick={() => this.removeLayer()}>
              <Icon
                style={{
                  color: "#546e7a",
                }}
              >
                remove_circle
              </Icon>
            </IconButton>
          </Grid>
        </Grid>
        <Grid // Network grid
          container
          style={{
            height: "35vw",
            width: "100vw",
            //backgroundColor: "#4d164d",
          }}
          justify="center"
          alignItems="center"
        >
          {this.state.inputLayer}
          {/* { Why not create a layer component?} */}
          {this.state.hidLayers.map((layer, index) => (
            <React.Fragment key={index}>{layer}</React.Fragment>
          ))}
          {this.state.outputLayer}
        </Grid>
      </div>
    );
  }
}
