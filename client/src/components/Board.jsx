import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import API from "../services/api";
import Comments from "./Comments";

function Board() {
  const [columns, setColumns] = useState({
    todo: [
      { id: "1", text: "Design UI", status: "todo" },
      { id: "2", text: "Setup project", status: "todo" },
    ],
    inprogress: [{ id: "3", text: "Build API", status: "inprogress" }],
    done: [{ id: "4", text: "Login page", status: "done" }],
  });

  const columnNames = {
    todo: "To Do",
    inprogress: "In Progress",
    done: "Done",
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceCol = Array.from(columns[source.droppableId]);
    const destCol = Array.from(columns[destination.droppableId]);

    const [moved] = sourceCol.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceCol.splice(destination.index, 0, moved);

      setColumns({
        ...columns,
        [source.droppableId]: sourceCol,
      });
    } else {
      moved.status = destination.droppableId;
      destCol.splice(destination.index, 0, moved);

      setColumns({
        ...columns,
        [source.droppableId]: sourceCol,
        [destination.droppableId]: destCol,
      });

      try {
        await API.put(`/tickets/${moved.id}`, {
          status: moved.status,
        });
      } catch (err) {
        console.log("Update failed", err);
      }
    }
  };

  return (
    <div className="w-full overflow-x-auto p-2 md:p-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 md:gap-6 min-w-[900px] md:min-w-full">

          {Object.keys(columns).map((colId) => (
            <Droppable droppableId={colId} key={colId}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`flex-1 bg-gray-100 rounded-2xl p-4 shadow-sm min-h-[500px] transition
                    ${
                      snapshot.isDraggingOver
                        ? "bg-indigo-50 ring-2 ring-indigo-300"
                        : ""
                    }`}
                >
                  {/* Column Header */}
                  <h2 className="font-semibold text-gray-700 mb-4 text-center">
                    {columnNames[colId]}
                  </h2>

                  {/* Cards */}
                  <div className="space-y-3">
                    {columns[colId].map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition
                              ${
                                snapshot.isDragging
                                  ? "rotate-1 scale-105 shadow-lg"
                                  : ""
                              }`}
                          >
                            <p className="font-medium text-gray-800">
                              {task.text}
                            </p>

                            {/* Comments toggle style */}
                            <div className="mt-3">
                              <Comments ticketId={task.id} />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default Board;