import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, MapPin, Clock, DollarSign, Camera, Calendar } from "lucide-react";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveTask: (task: any) => void;
  task: any;
}

export default function EditTaskModal({ isOpen, onClose, onSaveTask, task }: EditTaskModalProps) {
  const [taskData, setTaskData] = useState(task || {});

  useEffect(() => {
    if (task) {
      setTaskData(task);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveTask(taskData);
    onClose();
  };

  if (!isOpen || !task) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-card rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between rounded-t-3xl">
            <div>
              <h2 className="text-2xl font-bold">Edit Task</h2>
              <p className="text-sm text-muted-foreground mt-1">Update task details</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-secondary hover:bg-muted transition-colors flex items-center justify-center"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Task Title */}
            <div>
              <label className="block text-sm font-semibold mb-2">Task Title</label>
              <input
                type="text"
                value={taskData.title || ""}
                onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold mb-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type="text"
                  value={taskData.location || ""}
                  onChange={(e) => setTaskData({ ...taskData, location: e.target.value })}
                  className="w-full bg-secondary border border-border rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
            </div>

            {/* Category & Priority */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Category</label>
                <select
                  value={taskData.category || ""}
                  onChange={(e) => setTaskData({ ...taskData, category: e.target.value })}
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option>Inspection</option>
                  <option>Real Estate</option>
                  <option>Shopping</option>
                  <option>Virtual Tours</option>
                  <option>Training</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Priority</label>
                <select
                  value={taskData.priority || "medium"}
                  onChange={(e) =>
                    setTaskData({ ...taskData, priority: e.target.value as any })
                  }
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            {/* Duration & Budget */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Duration</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input
                    type="text"
                    value={taskData.estimatedHours ? `${taskData.estimatedHours} hours` : ""}
                    onChange={(e) =>
                      setTaskData({
                        ...taskData,
                        estimatedHours: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full bg-secondary border border-border rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Budget</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input
                    type="number"
                    value={taskData.budget || ""}
                    onChange={(e) => setTaskData({ ...taskData, budget: parseInt(e.target.value) })}
                    className="w-full bg-secondary border border-border rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Equipment */}
            <div>
              <label className="block text-sm font-semibold mb-2">Required Equipment</label>
              <div className="relative">
                <Camera className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <select
                  value={taskData.equipment || ""}
                  onChange={(e) => setTaskData({ ...taskData, equipment: e.target.value })}
                  className="w-full bg-secondary border border-border rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option>Phone Camera</option>
                  <option>Smart Glasses</option>
                  <option>360° Camera</option>
                </select>
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold mb-2">Status</label>
              <select
                value={taskData.status || "scheduled"}
                onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="scheduled">Scheduled</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 bg-secondary text-foreground font-semibold rounded-xl hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
