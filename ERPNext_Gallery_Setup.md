# ERPNext Gallery Setup Guide

This guide provides step-by-step instructions for creating the necessary DocTypes in ERPNext to manage your website's gallery content.

## 1. Gallery Category DocType

First, we'll create a DocType to manage the categories for your gallery items.

### Steps:

1.  **Navigate to DocType List**: Open your ERPNext desk and search for "DocType" in the awesome bar.
2.  **Create a New DocType**: Click on "New" to create a new DocType.
3.  **Naming and Module**:
    *   **Name**: `Gallery Category`
    *   **Module**: `Website` (or another module of your choice)
    *   Check **Is Submittable**, **Is Child Table**, and **Custom?**.

4.  **Fields**: Add the following fields to the DocType:

| Label           | Field Name      | Type        | Options/Description                               | Required |
| --------------- | --------------- | ----------- | ------------------------------------------------- | -------- |
| Category Name   | `category_name` | Data        | The name of the category (e.g., "Hair Styling").  | Yes      |
| Description     | `description`   | Text Editor | A brief description of the category.              | No       |
| Is Active       | `is_active`     | Check       | Check this to make the category visible.          | No       |
| Sort Order      | `sort_order`    | Int         | A number to control the display order.            | No       |

5.  **Permissions**:
    *   Go to the "Permission Rules" section.
    *   Add a rule for the **"Guest"** role and grant **"Read"** access. This allows website visitors to see the categories.
    *   Add rules for other roles (e.g., "System Manager", "Website Manager") to grant Create, Write, and Delete permissions as needed.

6.  **Save**: Click "Save" to create the DocType.

## 2. Gallery Item DocType

Next, create the DocType for the individual gallery items (images and videos).

### Steps:

1.  **Create a New DocType**: Go back to the DocType list and create another new DocType.
2.  **Naming and Module**:
    *   **Name**: `Gallery Item`
    *   **Module**: `Website`
    *   Check **Has Web View**, **Allow Attachments**, and **Custom?**.

3.  **Fields**: Add the following fields:

| Label           | Field Name        | Type        | Options/Description                                                              | Required |
| --------------- | ----------------- | ----------- | -------------------------------------------------------------------------------- | -------- |
| Title           | `title`           | Data        | The title of the gallery item.                                                   | Yes      |
| Description     | `description`     | Text Editor | A detailed description of the item.                                              | No       |
| Media Type      | `media_type`      | Select      | **Options**: `Image`, `Video`. This determines how the item is displayed.        | Yes      |
| Category        | `category`        | Link        | **Options**: `Gallery Category`. Links to the category DocType.                  | Yes      |
| Image URL       | `image_url`       | Attach Image| Upload the main image here.                                                      | No       |
| Thumbnail URL   | `thumbnail_url`   | Attach Image| Optional: A smaller image for grid views. If empty, the main image will be used. | No       |
| Video URL       | `video_url`       | Data        | URL for the video (e.g., from YouTube, Vimeo, or a direct file link).            | No       |
| Is Featured     | `is_featured`     | Check       | Check to feature this item on the homepage or other prominent sections.          | No       |
| Is Published    | `is_published`    | Check       | Only published items will be visible on the website.                             | No       |
| Sort Order      | `sort_order`      | Int         | A number to control the display order.                                           | No       |
| Tags            | `tags`            | Data        | Comma-separated tags for searching and filtering.                                | No       |

4.  **Settings**:
    *   In the "WEB VIEW" section, set **Route** to `gallery`. This will make items accessible at a URL like `/gallery/item-name`.

5.  **Permissions**:
    *   Go to the "Permission Rules" section.
    *   Add a rule for the **"Guest"** role and grant **"Read"** access.
    *   Configure other roles as needed.

6.  **Save**: Click "Save" to create the DocType.

## 3. Populating Content

After creating the DocTypes, you can start adding content:

1.  **Create Categories**: Go to the "Gallery Category" list and create a few categories (e.g., "Hair Styling", "Wig Installation", "Treatments").
2.  **Create Gallery Items**: Go to the "Gallery Item" list and add your images and videos.
    *   Assign a title, description, and category for each item.
    *   Select the correct `Media Type`.
    *   Upload an image to `Image URL`.
    *   If it's a video, paste the URL in `Video URL`.
    *   Check `Is Published` to make it visible on the website.

Once you have added some content and configured your `.env` file with the correct ERPNext URL and API credentials, the gallery on your website should display the items dynamically.
