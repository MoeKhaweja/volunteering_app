import React, { useState, useEffect } from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

import {
  Card,
  Button,
  IconButton,
  Snackbar,
  useTheme,
} from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { verifyImage } from "../../store/user";
import LoadingOrError from "../../components/loadingOrError";

export default function Verify() {
  const theme = useTheme();
  const [image, setImage] = useState(null);
  const [step, setStep] = useState(1);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const verified = useSelector((state) => state.user.isVerified);
  const dispatch = useDispatch();
  const [pickedDocument, setPickedDocument] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "application/pdf", // You can specify MIME types here (e.g., 'application/pdf', 'image/*', etc.)
      });
      console.log(res.canceled);
      if (res.canceled == false) {
        setPickedDocument(res);
      } else {
        console.log("Document picker canceled");
      }
    } catch (err) {
      console.error("Error picking document:", err);
    }
  };
  const removeImage = () => {
    setImage(null);
  };
  const removefile = () => {
    setPickedDocument(null);
  };

  const handleSubmit = async () => {
    // console.log(user);

    try {
      dispatch(verifyImage(image));
      // Handle successful login
      if (verified === false) {
        setStep(2);
      }
    } catch (error) {
      console.log(error);
      return;
    }
    setImage(null);
  };

  const toggleSnackbar = () => {
    setSnackbarVisible(!snackbarVisible);
  };

  const closeSnackbar = () => {
    setSnackbarVisible(false);
  };

  const submitDoc = () => {
    try {
      dispatch(verifyImage(image));
      // Handle successful login
      if (verified === false) {
        setStep(2);
      }
    } catch (error) {
      console.log(error);
      return;
    }
    setImage(null);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: theme.colors.tertiary,
      }}
    >
      {step == 1 && (
        <Card style={{ padding: 20 }}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>
            For Identity Verification
          </Text>
          <Text style={{ fontSize: 14, marginBottom: 20 }}>
            You are required to upload an image of your Identity card, you will
            not have full app access if you're not verified
          </Text>

          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {!image ? (
              <Button
                style={{ flex: 1 }}
                mode='contained'
                icon={() => <Icon name='camera' size={20} color='white' />}
                onPress={pickImage}
              >
                Pick Image
              </Button>
            ) : (
              <Button
                style={{ flex: 1 }}
                mode='contained'
                onPress={handleSubmit}
              >
                Submit Image
              </Button>
            )}

            <IconButton
              icon='information'
              color='gray'
              size={20}
              onPress={toggleSnackbar}
            />
          </View>
          <LoadingOrError></LoadingOrError>
          {image && (
            <View
              style={{
                alignItems: "center",
                marginTop: 20,
                flexDirection: "row",
              }}
            >
              <TouchableOpacity onPress={removeImage}>
                <Icon name='times-circle' size={20} color='red' />
              </TouchableOpacity>
              <Image
                source={{ uri: image }}
                style={{
                  width: 100,
                  height: 75,
                  borderRadius: 10,
                  marginTop: 10,
                  marginLeft: 5,
                }}
              />
            </View>
          )}
          <Snackbar
            visible={snackbarVisible}
            onDismiss={closeSnackbar}
            duration={5000}
            onTouchMove={closeSnackbar}
          >
            Your data is secure with us. By uploading an image, you agree to the
            use of 3rd party software to process your ID.
          </Snackbar>
        </Card>
      )}
      {step == 2 && (
        <View style={{ flexDirection: "row" }}>
          <Card style={{ padding: 20 }}>
            <Text>For Profile Completion</Text>
            <Text style={{ fontSize: 14, marginBottom: 20 }}>
              You are required to upload your resume, to make the process of
              completing your profile easier
            </Text>
            {pickedDocument == null ? (
              <Button
                mode='contained'
                icon={() => <Icon name='file' size={20} color='white' />}
                onPress={pickDocument}
              >
                Pick a Document
              </Button>
            ) : (
              <Button onPress={submitDoc} mode='contained'>
                Submit Document
              </Button>
            )}

            {pickedDocument && (
              <Card
                style={{
                  margin: 10,
                  padding: 15,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                    }}
                  >
                    <Text>{pickedDocument?.assets[0].name}</Text>
                    <Text>
                      {(
                        parseFloat(pickedDocument?.assets[0].size) *
                        10 ** -3
                      ).toFixed(2)}
                      KBs
                    </Text>
                  </View>
                  <TouchableOpacity onPress={removefile}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <Icon name='file-pdf-o' size={40} color='red' />
                      <Icon name='times-circle' size={20} color='red' />
                    </View>
                  </TouchableOpacity>
                </View>
              </Card>
            )}

            <LoadingOrError></LoadingOrError>
          </Card>
        </View>
      )}
    </View>
  );
}