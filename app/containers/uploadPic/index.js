import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Dimensions
} from "react-native";
import ImagePicker from "react-native-image-picker";

const { width, height, scale } = Dimensions.get("window");

class UploadPic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: ""
    };
  }

  uploadHandler() {
    const options = {
      title: "upload image",
      customButtons: [{ name: "fb", title: "choose a pic" }],
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };

    ImagePicker.showImagePicker(options, async response => {
      console.log("Response = ", response);
      if (response.data) {
        const formData = new FormData();
        let file = {
          uri: response.uri,
          type: "multipart/form-data",
          name: response.fileName
        };
        formData.append("file", file);
        fetch("http://localhost:3000/image", {
          method: "post",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          body: formData
        })
          .then(response => response.json())
          .then(responseJSON => console.log(responseJSON))
          .catch(err => console.error(err));
      }
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          style={{ flex: 1 }}
          title={"upload"}
          onPress={this.uploadHandler.bind(this)}
        />
        {!this.state.avatarSource
          ? <Text>
              {this.state.avatarSource}
            </Text>
          : <Image
              source={this.state.avatarSource}
              style={{ width: width, height: 3 * width / 4 }}
            />}
      </View>
    );
  }
}

export default UploadPic;
